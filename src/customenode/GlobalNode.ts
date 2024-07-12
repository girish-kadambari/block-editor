
import { NLP_BLOCK_TYPE } from "../nlp-contants";
import { TestDataNode, SerializedTestDataNode } from "./TestDataNode";
import { $createTextNode } from "lexical";

export class GlobalNode extends TestDataNode {
  static getType(): string {
    return NLP_BLOCK_TYPE.global;
  }

  createDOM() {
    const element = super.createDOM();
    element.className += "global-node";
    element.textContent = `*|${this.__value}|`;
    return element;
  }

  updateDOM(prevNode: GlobalNode, dom: HTMLElement) {
    if (prevNode.__value !== this.__value) {
      dom.textContent = `*|${this.__value}|`;
      return true;
    }
    return false;
  }

  static importJSON(serializedNode: SerializedTestDataNode) {
    const { value, uuid, hasValue, more_details, isEncrypted } = serializedNode;
    return new GlobalNode(
      NLP_BLOCK_TYPE.global,
      value,
      uuid,
      hasValue,
      more_details,
      isEncrypted
    );
  }
}

export function $createGlobalNode(
  value: string,
  uuid: string,
  hasValue?: boolean,
  moreDetails?: object,
  isEncrypted?: boolean
) {
  const node = new GlobalNode(
    NLP_BLOCK_TYPE.global,
    value,
    uuid,
    hasValue,
    moreDetails,
    isEncrypted
  );
  node.append($createTextNode(value));
  return node;
}

export function $isGlobalNode(node: any): node is GlobalNode {
  return node instanceof GlobalNode;
}
