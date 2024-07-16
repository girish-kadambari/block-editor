import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import AutoPopulatePlugin from "@plugins/AutoPopulatePlugin";
import TestDataDropDownEventPlugin from "@plugins/TestDataDropDownEventPlugin";
import ExampleTheme from "./ExampleTheme";
import {
  GlobalNode,
  ParameterNode,
  RawNode,
  ReadOnlyNode,
  RuntimeNode,
  TestDataNode,
  UiIdentifierNode,
} from "./nodes/index";

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

export default function App({ blocks }) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className=" !outline-none whitespace-nowrap overflow-hidden flex items-center relative text-small leading-5 flex-grow py-[3.2px]">
        <PlainTextPlugin
          contentEditable={
            <ContentEditable className="w-full !outline-none flex  items-center relative text-small leading-5 flex-grow flex-wrap" />
          }
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {/* <AutoFocusPlugin /> */}
        <AutoPopulatePlugin blocks={blocks} />
        <TestDataDropDownEventPlugin />
      </div>
    </LexicalComposer>
  );
}
