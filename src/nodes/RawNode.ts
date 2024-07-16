import { NLP_BLOCK_TYPE } from "../nlp-contants";
import { SerializedTestDataNode, TestDataNode } from "./TestDataNode";
import { $applyNodeReplacement, $createTextNode } from "lexical";

export class RawNode extends TestDataNode {
  static getType(): string {
    return NLP_BLOCK_TYPE.raw;
  }

  createDOM() {
    const element = super.createDOM();
    element.className +=
      " inline-block text-unique-500 px-1 py-0.5 rounded outline-none cursor-pointer  max-w-[350px] whitespace-normal ";
    element.textContent = `${this.__value}`;
    return element;
  }

  updateDOM(prevNode: RawNode, dom: HTMLElement) {
    if (prevNode.__value !== this.__value) {
      dom.textContent = `${this.__value}`;
      return true;
    }
    return false;
  }

  static clone(node: RawNode) {
    return new RawNode(
      node.__value_type,
      node.__value,
      node.__uuid,
      node.__hasValue,
      node.__more_details,
      node.__isEncrypted,
      node.__key
    );
  }

  canBeEmpty(): boolean {
    return false;
  }

  static importJSON(serializedNode: SerializedTestDataNode) {
    const { value, uuid, hasValue, more_details, isEncrypted } = serializedNode;
    return new RawNode(
      NLP_BLOCK_TYPE.raw,
      value,
      uuid,
      hasValue,
      more_details,
      isEncrypted
    );
  }
}

export function $createRawNode(
  value: string,
  uuid: string,
  hasValue?: boolean,
  moreDetails?: object,
  isEncrypted?: boolean
) {
  const node = new RawNode(
    NLP_BLOCK_TYPE.raw,
    value,
    uuid,
    hasValue,
    moreDetails,
    isEncrypted
  );
  return $applyNodeReplacement(node);
}

export function $isRawNode(node: any): node is RawNode {
  return node instanceof RawNode;
}
