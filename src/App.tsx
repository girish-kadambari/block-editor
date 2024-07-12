import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import ExampleTheme from './ExampleTheme';
import { AttributeNode } from './nodes/AttributeNode';
import { ReadOnlyNode } from './nodes/ReadOnlyNode';
import { UiIdentifierNode } from './nodes/UiIdentifierNode';
import AutoPopulatePlugin from './plugins/AutoPopulatePlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';

function Placeholder() {
  return <div className="editor-placeholder">Enter some text...</div>;
}

const editorConfig = {
  namespace: 'TestCaseEditor',
  nodes: [UiIdentifierNode, AttributeNode,ReadOnlyNode],
  theme: ExampleTheme,
  onError(error: Error) {
    throw error;
  },
};

export default function App() {
  const initialText = 'Wait until the attribute @{attribute} value of the element #{ui-identifier} is changed';

  

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
          <AutoPopulatePlugin initialText={initialText} />
          {/* <DropdownPlugin /> */}
          <TreeViewPlugin/>
        </div>
      </div>
    </LexicalComposer>
  );
}