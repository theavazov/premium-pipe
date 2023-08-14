import { createContext, useState } from "react";

export const FormContext = createContext();

export default function FormContextProvider({ children }) {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <FormContext.Provider value={{ isSuccess, setIsSuccess }}>
      {children}
    </FormContext.Provider>
  );
}
