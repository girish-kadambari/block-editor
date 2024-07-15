import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { blocks } from "./blockData";
import { GlobalNode } from "./customenode/GlobalNode";
import { ParameterNode } from "./customenode/ParameterNode";
import { ReadOnlyNode } from "./customenode/ReadOnlyNode";
import { RuntimeNode } from "./customenode/RuntimeNode";
import { TestDataNode } from "./customenode/TestDataNode";
import { UiIdentifierNode } from "./customenode/UiIdentifierNode";
import ExampleTheme from "./ExampleTheme";
import AutoPopulatePlugin from "./plugins/AutoPopulatePlugin";
import EditorWithDropdown from "./plugins/NodeEventsPlugin";

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
          <EditorWithDropdown />
        </div>
      </div>
    </LexicalComposer>
  );
}
