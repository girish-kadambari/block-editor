import { TextNode, SerializedTextNode, NodeKey } from "lexical";

type SerializedAttributeNode = {
  type: "readonly";
  text: string;
  version: number;
} & SerializedTextNode;

export class ReadOnlyNode extends TextNode {
  static getType() {
    return "readonly";
  }

  static clone(node: ReadOnlyNode) {
    return new ReadOnlyNode(node.__text, node.__key);
  }

  constructor(text: string, key?: NodeKey) {
    super(text, key);
  }

  createDOM() {
    const element = document.createElement("span");
    element.className = "readonly-node";
    element.textContent = this.__text;
    element.ariaReadOnly = "true";
    element.ariaDisabled ="true";
    element.contentEditable = "false";
    return element;
  }

  updateDOM(prevNode: ReadOnlyNode, dom: HTMLElement) {
    if (prevNode.__text !== this.__text) {
      dom.textContent = this.__text;
      return true;
    }
    return false;
  }

  static importJSON(serializedNode: SerializedAttributeNode) {
    const { text } = serializedNode;
    return new ReadOnlyNode(text);
  }

  exportJSON(): SerializedAttributeNode {
    return {
      ...super.exportJSON(),
      type: "readonly",
    };
  }

  
   
  canInsertTextAfter(): boolean {
      return false;
  }
  canInsertTextBefore(): boolean {
    return false;
}
}


export function $createReadonlyNode(text: string) {
  return new ReadOnlyNode(text);
}

export function $isReadonlyNode(node: any): node is ReadOnlyNode {
  return node instanceof ReadOnlyNode;
}
