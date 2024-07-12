import { TextNode, SerializedTextNode, NodeKey } from "lexical";

type SerializedAttributeNode = {
  type: "attribute";
  text: string;
  version: number;
} & SerializedTextNode;

export class AttributeNode extends TextNode {
  static getType() {
    return "attribute";
  }

  static clone(node: AttributeNode) {
    return new AttributeNode(node.__text, node.__key);
  }

  constructor(text: string, key?: NodeKey) {
    super(text, key);
  }

  createDOM() {
    const element = document.createElement("span");
    element.className = "attribute-node";
    element.textContent = this.__text;
    element.setAttribute("contenteditable", "false");
    return element;
  }

  
  updateDOM(prevNode: AttributeNode, dom: HTMLElement) {
    if (prevNode.__text !== this.__text) {
      dom.textContent = this.__text;
      return true;
    }
    return false;
  }

  static importJSON(serializedNode: SerializedAttributeNode) {
    const { text } = serializedNode;
    return new AttributeNode(text);
  }

  exportJSON(): SerializedAttributeNode {
    return {
      ...super.exportJSON(),
      type: "attribute",
    };
  }
}

export function $createAttributeNode(text: string) {
  return new AttributeNode(text);
}

export function $isAttributeNode(node: any): node is AttributeNode {
  return node instanceof AttributeNode;
}
