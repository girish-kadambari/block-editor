
import { NLP_BLOCK_TYPE } from "../nlp-contants";
import { TestDataNode, SerializedTestDataNode } from "./TestDataNode";
import { $createTextNode } from "lexical";

export class RuntimeNode extends TestDataNode {
  static getType(): string {
    return NLP_BLOCK_TYPE.runtime;
  }

  createDOM() {
    const element = super.createDOM();
    element.className += " runtime-node";
    element.textContent = `$|${this.__value}|`;
    return element;
  }

  updateDOM(prevNode: RuntimeNode, dom: HTMLElement) {
    if (prevNode.__value !== this.__value) {
      dom.textContent = `$|${this.__value}|`;
      return true;
    }
    return false;
  }

  static importJSON(serializedNode: SerializedTestDataNode) {
    const { value, uuid, hasValue, more_details, isEncrypted } = serializedNode;
    return new RuntimeNode(
      NLP_BLOCK_TYPE.runtime,
      value,
      uuid,
      hasValue,
      more_details,
      isEncrypted
    );
  }
}

export function $createRuntimeNode(
  value: string,
  uuid: string,
  hasValue?: boolean,
  moreDetails?: object,
  isEncrypted?: boolean
) {
  const node = new RuntimeNode(
    NLP_BLOCK_TYPE.runtime,
    value,
    uuid,
    hasValue,
    moreDetails,
    isEncrypted
  );
  node.append($createTextNode(value));
  return node;
}

export function $isRuntimeNode(node: any): node is RuntimeNode {
  return node instanceof RuntimeNode;
}
