import React, { useEffect, useState, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, LexicalNode } from "lexical";
import { $isUiIdentifierNode } from "../nodes/UiIdentifierNode";
import { $isAttributeNode } from "../nodes/AttributeNode";

function getNodePosition(node: LexicalNode, editor) {
  const domElement = editor.getElementByKey(node.getKey());
  if (domElement) {
    const rect = domElement.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };
  }
  return null;
}

function Dropdown({
  node,
  position,
}: {
  node: LexicalNode;
  position: { top: number; left: number };
}) {
  return (
    <div
      className="dropdown"
      style={{ top: position.top, left: position.left }}
    >
      <button>Edit</button>
      <button>Remove</button>
    </div>
  );
}

export default function DropdownPlugin() {
  const [editor] = useLexicalComposerContext();
  const [dropdownNode, setDropdownNode] = useState<LexicalNode | null>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

 

  return dropdownNode && position ? (
    <Dropdown node={dropdownNode} position={position} />
  ) : null;
}
