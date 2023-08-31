import { createContext, useState } from "react";

export const ModalContext = createContext();

export default function ModalContextProvider({ children }) {
  const [isModal, setIsModal] = useState(false);
  const [variant, setVariant] = useState(""); // store | view
  const [modalCase, setModalCase] = useState("gallery"); // "gallery" | "edit" | "calendar"
  const [media, setMedia] = useState([]);
  const [index, setIndex] = useState("");

  const value = {
    isModal,
    setIsModal,
    variant,
    setVariant,
    modalCase,
    setModalCase,
    media,
    setMedia,
    index,
    setIndex,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
