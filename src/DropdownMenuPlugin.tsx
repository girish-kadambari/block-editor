import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTextNode, $getNodeByKey } from "lexical";
import { useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import { useDropdown } from "./DropdownContext";
import { $createParameterNode } from "./customenode/ParameterNode";
import { $createUiIdentifierNode } from "./customenode/UiIdentifierNode";
import { NLP_BLOCK_TYPE } from "./nlp-contants";
import { $createGlobalNode } from "./customenode/GlobalNode";
import { $createRuntimeNode } from "./customenode/RuntimeNode";

const options = [
  { name: "Plain Text", type: "raw" },
  { name: "Parameter", type: "parameter" },
  { name: "Runtime", type: "runtime" },
  { name: "Environment", type: "global" },
  { name: "Random", type: "random" },
  { name: "Data Generator", type: "function" },
  { name: "Phone Number", type: "phone_number" },
  { name: "Mail Box", type: "mail_box" },
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

const DropdownMenuPlugin = () => {
  const { dropdownKey, dropdownPosition, closeDropdown, nodeType } =
    useDropdown();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [editor] = useLexicalComposerContext();
  const { styles, attributes } = usePopper(
    dropdownRef.current,
    dropdownRef.current,
    {
      placement: "bottom-start",
      strategy: "fixed",
    }
  );

  useEffect(() => {
    if (dropdownKey && dropdownPosition) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          closeDropdown();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [dropdownKey, dropdownPosition, closeDropdown]);


  
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
      closeDropdown();
    }
  };

  if (!dropdownKey || !dropdownPosition) {
    return null;
  }

  return (
    <div ref={dropdownRef} style={{ ...styles.popper }} {...attributes.popper}>
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
    </div>
  );
};

export default DropdownMenuPlugin;
