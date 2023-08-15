import { createContext, useState } from "react";

export const ModalContext = createContext();

export default function ModalContextProvider({ children }) {
  const [isModal, setIsModal] = useState(false);
  const [variant, setVariant] = useState(""); // store | view

  const value = {
    isModal,
    setIsModal,
    variant,
    setVariant,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
