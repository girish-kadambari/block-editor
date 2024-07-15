import { NLP_BLOCK_TYPE } from "@constants";
import {
  ElementNode,
  LexicalNode,
  NodeKey,
  SerializedElementNode,
  $createTextNode,
} from "lexical";

export type SerializedTestDataNode = {
  type: "raw";
  version: number;
  value_type: NLP_BLOCK_TYPE;
  value: string;
  uuid: string;
  hasValue?: boolean;
  more_details?: object;
  isEncrypted?: boolean;
} & SerializedElementNode;

export class TestDataNode extends ElementNode {
  __value_type: NLP_BLOCK_TYPE;
  __value: string;
  __uuid: string;
  __hasValue?: boolean;
  __more_details?: object;
  __isEncrypted?: boolean;

  static getType(): string {
    return "raw";
  }
  static clone(node: TestDataNode) {
    return new TestDataNode(
      node.__value_type,
      node.__value,
      node.__uuid,
      node.__hasValue,
      node.__more_details,
      node.__isEncrypted,
      node.__key
    );
  }

  constructor(
    valueType: NLP_BLOCK_TYPE,
    value: string,
    uuid: string,
    hasValue?: boolean,
    moreDetails?: object,
    isEncrypted?: boolean,
    key?: NodeKey
  ) {
    super(key);
    this.__value_type = valueType;
    this.__value = value;
    this.__uuid = uuid;
    this.__hasValue = hasValue;
    this.__more_details = moreDetails;
    this.__isEncrypted = isEncrypted;
  }

  createDOM() {
    const element = document.createElement("span");
    element.className = `test-data-node ${this.__value_type}`;
    element.textContent = this.__value;
    return element;
  }

  updateDOM(prevNode: TestDataNode, dom: HTMLElement) {
    if (prevNode.__value !== this.__value) {
      dom.textContent = this.__value;
      return true;
    }
    return false;
  }

  static importJSON(serializedNode: SerializedTestDataNode) {
    const { value_type, value, uuid, hasValue, more_details, isEncrypted } =
      serializedNode;
    return new TestDataNode(
      value_type,
      value,
      uuid,
      hasValue,
      more_details,
      isEncrypted
    );
  }

  canBeEmpty(): boolean {
    return true;
  }

  exportJSON(): SerializedTestDataNode {
    return {
      ...super.exportJSON(),
      type: "raw",
      value_type: this.__value_type,
      value: this.__value,
      uuid: this.__uuid,
      hasValue: this.__hasValue,
      more_details: this.__more_details,
      isEncrypted: this.__isEncrypted,
      version: 1,
    };
  }
}

export function $createTestDataNode(
  valueType: NLP_BLOCK_TYPE,
  value: string,
  uuid: string,
  hasValue?: boolean,
  moreDetails?: object,
  isEncrypted?: boolean
) {
  return new TestDataNode(
    valueType,
    value,
    uuid,
    hasValue,
    moreDetails,
    isEncrypted
  );
}

export function $isTestDataNode(node: any): node is TestDataNode {
  return node instanceof TestDataNode;
}
