import {
  GlobalNode,
  ParameterNode,
  RawNode,
  ReadOnlyNode,
  RuntimeNode,
  TestDataNode,
  UiIdentifierNode,
} from "./nodes/index";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { blocks } from "./blockData";
import ExampleTheme from "./ExampleTheme";
import AutoPopulatePlugin from "@plugins/AutoPopulatePlugin";
import TestDataDropDownEventPlugin from "@plugins/TestDataDropDownEventPlugin";
import TreeViewPlugin from "@plugins/TreeViewPlugin";

function Placeholder() {
  return <div className="editor-placeholder">Enter some text...</div>;
}

const editorConfig = {
  namespace: "TestCaseEditor",
  nodes: [
    UiIdentifierNode,
    ParameterNode,
    RuntimeNode,
    GlobalNode,
    ReadOnlyNode,
    TestDataNode,
    RawNode,
  ],
  theme: ExampleTheme,
  onError(error: Error) {
    throw error;
  },
};

export default function App() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <div className="editor-inner">
          <PlainTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <AutoPopulatePlugin blocks={blocks} />
          <TestDataDropDownEventPlugin />
          <TreeViewPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
