import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { $createTextNode, $createParagraphNode, $getRoot, $getNodeByKey } from 'lexical';


import { $createAttributeNode } from '../nodes/AttributeNode';
import { BlockType } from '../utils';
import { $createParameterNode } from '../customenode/ParameterNode';
import { $createUiIdentifierNode } from '../customenode/UiIdentifierNode';
import { $createRuntimeNode } from '../customenode/RuntimeNode';
import { $createGlobalNode } from '../customenode/GlobalNode';
import { $createReadonlyNode } from '../customenode/ReadOnlyNode';

const createNode = (block: BlockType) => {
  switch (block.type) {
    case 'parameter':
      return $createParameterNode(block.value, block.uuid);
    case 'ui_identifier':
      return $createUiIdentifierNode(block.value, block.uuid);
    case 'runtime':
      return $createRuntimeNode(block.value, block.uuid);
    case 'global':
      return $createGlobalNode(block.value, block.uuid);
    case 'readonly_text':
    default:
     return $createReadonlyNode(block.value);
  }
};

export default function AutoPopulatePlugin({ blocks }: { blocks: BlockType[] }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();
      const paragraphNode = $createParagraphNode();

      blocks.forEach(block => {
        const node = createNode(block);
        paragraphNode.append(node);
      });

      root.append(paragraphNode);
    });
  }, [editor, blocks]);

  return null;
}