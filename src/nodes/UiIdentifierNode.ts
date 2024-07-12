import { TextNode, SerializedTextNode, NodeKey } from "lexical";

type SerializedUiIdentifierNode = {
  type: "ui-identifier";
  text: string;
  version: number;
} & SerializedTextNode;

export class UiIdentifierNode extends TextNode {
  static getType() {
    return "ui-identifier";
  }

  static clone(node: UiIdentifierNode) {
    return new UiIdentifierNode(node.__text, node.__key);
  }

  constructor(text: string, key?: NodeKey) {
    super(text, key);
  }

  createDOM() {
    const element = document.createElement("span");
    element.textContent = this.__text;
    element.className = "text-xl ui-identifier-node"
    element.setAttribute("contenteditable", "true");
    return element;
  }

  updateDOM(prevNode: UiIdentifierNode, dom: HTMLElement) {
    if (prevNode.__text !== this.__text) {
      dom.textContent = this.__text;
      return true;
    }
    return false;
  }

  static importJSON(serializedNode: SerializedUiIdentifierNode) {
    const { text } = serializedNode;
    return new UiIdentifierNode(text);
  }

  exportJSON(): SerializedUiIdentifierNode {
    return {
      ...super.exportJSON(),
      type: "ui-identifier",
    };
  }

  remove(preserveEmptyParent?: boolean): void {
    if(preserveEmptyParent){
      super.remove(preserveEmptyParent);
    }
  
  }



}

export function $createUiIdentifierNode(text: string) {
  return new UiIdentifierNode(text);
}

export function $isUiIdentifierNode(node: any): node is UiIdentifierNode {
  return node instanceof UiIdentifierNode;
}
