import { $createTextNode, $getNodeByKey, LexicalNode } from "lexical";
import { NodeEventPlugin } from "@lexical/react/LexicalNodeEventPlugin";
import {
  $createParameterNode,
  ParameterNode,
} from "../customenode/ParameterNode";
import {
  $createUiIdentifierNode,
  UiIdentifierNode,
} from "../customenode/UiIdentifierNode";
import { $createRuntimeNode, RuntimeNode } from "../customenode/RuntimeNode";
import { $createGlobalNode, GlobalNode } from "../customenode/GlobalNode";
import { Dropdown } from "../Dropdown";
import { NLP_BLOCK_TYPE } from "../constants";
import { useRef, useState, useLayoutEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { usePopper } from "react-popper";

const options = [
  { name: "Plain Text", type: NLP_BLOCK_TYPE.raw },
  { name: "Parameter", type: NLP_BLOCK_TYPE.parameter },
  { name: "Runtime", type: NLP_BLOCK_TYPE.runtime },
  { name: "Environment", type: NLP_BLOCK_TYPE.global },
  { name: "Random", type: NLP_BLOCK_TYPE.random },
  { name: "Data Generator", type: NLP_BLOCK_TYPE.function },
  { name: "Phone Number", type: NLP_BLOCK_TYPE.phone_number },
  { name: "Mail Box", type: NLP_BLOCK_TYPE.mail_box },
];

const createNode = (type: string, value: string, uuid: string) => {
  switch (type) {
    case NLP_BLOCK_TYPE.parameter:
      return $createParameterNode(value, uuid);
    case NLP_BLOCK_TYPE.ui_identifier:
      return $createUiIdentifierNode(value, uuid);
    case NLP_BLOCK_TYPE.global:
      return $createGlobalNode(value, uuid);
    case NLP_BLOCK_TYPE.runtime:
      return $createRuntimeNode(value, uuid);
    // Add cases for other custom nodes as needed
    default:
      return $createTextNode(value);
  }
};

const EditorWithDropdown = () => {
  const [dropdownKey, setDropdownKey] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownRef, setDropdownRef] = useState(null);
  const blockRef = useRef<HTMLElement | null>(null);
  const [editor] = useLexicalComposerContext();
  const { styles, attributes, update } = usePopper(
    blockRef.current,
    dropdownRef,
    {
      placement: "bottom-start",
      strategy: "fixed",
    }
  );

  useLayoutEffect(() => {
    update?.();
  }, [dropdownKey, showDropdown, update]);

  const handleEvent = (
    event: Event,
    editor: any,
    nodeKey: string,
    node: LexicalNode
  ) => {
    const target = event.target as HTMLElement;
    if (target) {
      blockRef.current = target;
      setDropdownKey(nodeKey);
      setShowDropdown(true);
    } else {
      blockRef.current = null;
    }
  };

  const handleOptionClick = (type: string) => {
    if (dropdownKey) {
      editor.update(() => {
        const node = $getNodeByKey(dropdownKey);
        if (node) {
          const newNode = createNode(
            type,
            `Replaced with ${type}`,
            dropdownKey
          );
          node.replace(newNode);
        }
      });
      setShowDropdown(false);
    }
  };

  return (
    <>
      <NodeEventPlugin
        nodeType={ParameterNode}
        eventType={"click"}
        eventListener={(event, editor, nodeKey) => {
          const node = $getNodeByKey(nodeKey);
          if (node) {
            handleEvent(event, editor, nodeKey, node);
          }
        }}
      />
      <NodeEventPlugin
        nodeType={UiIdentifierNode}
        eventType={"click"}
        eventListener={(event, editor, nodeKey) => {
          const node = $getNodeByKey(nodeKey);
          if (node) {
            handleEvent(event, editor, nodeKey, node);
          }
        }}
      />
      <NodeEventPlugin
        nodeType={RuntimeNode}
        eventType={"click"}
        eventListener={(event, editor, nodeKey) => {
          const node = $getNodeByKey(nodeKey);
          if (node) {
            handleEvent(event, editor, nodeKey, node);
          }
        }}
      />
      <NodeEventPlugin
        nodeType={GlobalNode}
        eventType={"click"}
        eventListener={(event, editor, nodeKey) => {
          const node = $getNodeByKey(nodeKey);
          if (node) {
            handleEvent(event, editor, nodeKey, node);
          }
        }}
      />

      {showDropdown && (
        <Dropdown
          key="drop-down"
          className="w-[180px] min-w-[90px] z-[1000]"
          toggleDropdown={setShowDropdown}
          setRef={setDropdownRef}
          style={styles.popper}
          attributes={attributes.popper}
          buttonRef={blockRef}
        >
          {options.map((option) => (
            <div
              key={option.type}
              onClick={() => handleOptionClick(option.type)}
              style={{
                padding: "8px",
                cursor: "pointer",
                background: "white",
                border: "1px solid #ddd",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {option.name}
            </div>
          ))}
        </Dropdown>
      )}
    </>
  );
};

export default EditorWithDropdown;
