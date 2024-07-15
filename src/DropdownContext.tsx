import React, { createContext, useContext, useState, useCallback, ReactNode, FC } from 'react';
import { LexicalNode } from 'lexical';

type DropdownContextType = {
  openDropdown: (key: string, position: { top: number; left: number }, nodeType: string) => void;
  closeDropdown: () => void;
  dropdownKey: string | null;
  dropdownPosition: { top: number; left: number } | null;
  nodeType: string | null;
};

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const DropdownProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [dropdownKey, setDropdownKey] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [nodeType, setNodeType] = useState<string | null>(null);

  const openDropdown = useCallback((key: string, position: { top: number; left: number }, nodeType: string) => {
    setDropdownKey(key);
    setDropdownPosition(position);
    setNodeType(nodeType);
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownKey(null);
    setDropdownPosition(null);
    setNodeType(null);
  }, []);

  return (
    <DropdownContext.Provider value={{ openDropdown, closeDropdown, dropdownKey, dropdownPosition, nodeType }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};