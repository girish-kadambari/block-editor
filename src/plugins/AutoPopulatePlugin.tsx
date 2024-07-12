import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createParagraphNode, $getRoot } from 'lexical';
import { useEffect } from 'react';
import { $createAttributeNode } from '../nodes/AttributeNode';
import { $createReadonlyNode } from '../nodes/ReadOnlyNode';
import { $createUiIdentifierNode } from '../nodes/UiIdentifierNode';

const pattern = /(@\{[^}]+\}|#\{[^}]+\})/g;

const parseText = (text: string) => {
  const parts = text.split(pattern);
  const nodes = parts.map(part => {
    if (part.startsWith('@{')) {
      return $createAttributeNode(part.slice(2, -1));
    } else if (part.startsWith('#{')) {
      return $createUiIdentifierNode(part.slice(2, -1));
    } else {
      return $createReadonlyNode(part) 
    }
  });
  return nodes;
};

export default function AutoPopulatePlugin({ initialText }: { initialText: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();
      const paragraphNode = $createParagraphNode();
      const nodes = parseText(initialText);
      nodes.forEach(node => paragraphNode.append(node));
      root.append(paragraphNode);
    });
  }, [editor, initialText]);

  return null;
}
