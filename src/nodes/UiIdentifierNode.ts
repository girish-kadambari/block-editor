import { NLP_BLOCK_TYPE } from "../nlp-contants";
import { TestDataNode, SerializedTestDataNode } from "./TestDataNode";
import { $applyNodeReplacement, $createTextNode } from "lexical";

export class UiIdentifierNode extends TestDataNode {
  static getType(): string {
    return NLP_BLOCK_TYPE.ui_identifier;
  }

  createDOM() {
    const element = super.createDOM();
    element.className += " ui-identifier-node bg-red";
    element.textContent = `${this.__value}`;
    return element;
  }

  updateDOM(prevNode: UiIdentifierNode, dom: HTMLElement) {
    if (prevNode.__value !== this.__value) {
      dom.textContent = `#${this.__value}`;
      return true;
    }
    return false;
  }

  static importJSON(serializedNode: SerializedTestDataNode) {
    const { value, uuid, hasValue, more_details, isEncrypted } = serializedNode;
    return new UiIdentifierNode(
      NLP_BLOCK_TYPE.ui_identifier,
      value,
      uuid,
      hasValue,
      more_details,
      isEncrypted
    );
  }
}

export function $createUiIdentifierNode(
  value: string,
  uuid: string,
  hasValue?: boolean,
  moreDetails?: object,
  isEncrypted?: boolean
) {
  const node = new UiIdentifierNode(
    NLP_BLOCK_TYPE.ui_identifier,
    value,
    uuid,
    hasValue,
    moreDetails,
    isEncrypted
  );
  return $applyNodeReplacement(node);
}

export function $isUiIdentifierNode(node: any): node is UiIdentifierNode {
  return node instanceof UiIdentifierNode;
}
