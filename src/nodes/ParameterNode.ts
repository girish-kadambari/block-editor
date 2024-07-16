import { NLP_BLOCK_TYPE } from "../nlp-contants";
import { SerializedTestDataNode, TestDataNode } from "./TestDataNode";
import { $applyNodeReplacement, $createTextNode } from "lexical";

export class ParameterNode extends TestDataNode {
  static getType(): string {
    return NLP_BLOCK_TYPE.parameter;
  }

  createDOM() {
    const element = super.createDOM();
    element.className = " inline-block text-unique-500 px-1 py-0.5 rounded outline-none cursor-pointer  max-w-[350px] whitespace-normal";
    element.textContent = `@|${this.__value}|`;
    element.contentEditable = "false"
    return element;
  }

  updateDOM(prevNode: ParameterNode, dom: HTMLElement) {
    if (prevNode.__value !== this.__value) {
      dom.textContent = `@|${this.__value}|`;
      return true;
    }
    return false;
  }

  static clone(node: ParameterNode) {
    return new ParameterNode(
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
    return true;
  }

  static importJSON(serializedNode: SerializedTestDataNode) {
    const { value, uuid, hasValue, more_details, isEncrypted } = serializedNode;
    return new ParameterNode(
      NLP_BLOCK_TYPE.parameter,
      value,
      uuid,
      hasValue,
      more_details,
      isEncrypted
    );
  }
}

export function $createParameterNode(
  value: string,
  uuid: string,
  hasValue?: boolean,
  moreDetails?: object,
  isEncrypted?: boolean
) {
  const node = new ParameterNode(
    NLP_BLOCK_TYPE.parameter,
    value,
    uuid,
    hasValue,
    moreDetails,
    isEncrypted
  );
  return $applyNodeReplacement(node);
}

export function $isParameterNode(node: any): node is ParameterNode {
  return node instanceof ParameterNode;
}
