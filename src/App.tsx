import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { UiIdentifierNode } from './nodes/UiIdentifierNode';
import { AttributeNode } from './nodes/AttributeNode';
import ExampleTheme from './ExampleTheme';
import DropdownPlugin from './plugins/DropdownPlugin';
import AutoPopulatePlugin from './plugins/AutoPopulatePlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import { ReadOnlyNode } from './nodes/ReadOnlyNode';
import { EditorState } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

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