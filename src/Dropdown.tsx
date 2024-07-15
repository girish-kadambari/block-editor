import classNames from "classnames";
import { useRef } from "react";
import useClickOutside from "./hooks";

export interface DropdownProps {
  /**
   * Content of dropdown
   */
  children: React.ReactNode;
  /**
   * CSS Class Names
   */
  className?: string;
  /**
   * Eleement Reference
   */
  setRef?: any;
  /**
   * function on toggle
   */
  toggleDropdown?: (toggle: boolean) => void;
  /**
   * Style Object
   */
  style?: object;
  /**
   * Attributes Object
   */
  attributes?: object;
  /**
   * Support for animation
   */
  isAnimationEnabled?: boolean;
  onToggleHandler?: (event: MouseEvent) => void;
  closeOnClickOutside?: boolean;

  buttonRef?: React.Ref<HTMLElement>;
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  setRef,
  onToggleHandler,
  toggleDropdown,
  className,
  style = {},
  attributes = {},
  isAnimationEnabled = false,
  closeOnClickOutside = true,
  buttonRef = null,
  ...extra
}: DropdownProps) => {
  const ref = useRef(null);
  const updateRef = (el) => {
    ref.current = el;
    setRef?.(el);
  };

  useClickOutside(
    ref,
    (event) => {
      onToggleHandler
        ? onToggleHandler(event)
        : closeOnClickOutside && toggleDropdown?.(false);
    },
    true,
    buttonRef
  );

  return (
    <div
      ref={updateRef}
      className={classNames(
        "bg-white rounded overflow-hidden shadow-md gap-0.5 z-[1000] max-h-[320px] overflow-y-auto",
        className,
        {
          "absolute top-full left-0 transition-all duration-300 ease-out":
            isAnimationEnabled,
        }
      )}
      style={style}
      {...attributes}
      {...extra}
    >
      {children}
    </div>
  );
};
