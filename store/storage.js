import { createContext, useEffect, useState } from "react";

export const OrdersContext = createContext();

export default function OrdersContextProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    const storage = localStorage.getItem("orders");
    setOrders(storage === null ? [] : JSON.parse(storage));
  }, []);

  useEffect(() => {
    let i = 0;
    orders.forEach((order) => {
      i += order.count;
    });
    setTotal(i);
  }, [orders]);

  return (
    <OrdersContext.Provider value={{ orders, setOrders, total }}>
      {children}
    </OrdersContext.Provider>
  );
}
