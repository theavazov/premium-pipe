import Image from "next/image";
import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import IntroSection from "../components/universal/intro";
import { cart2, minus, plus, x } from "../public/icons";
import styles from "../styles/cart.module.css";
import stules from "../styles/search.module.css";
import noimage from "../public/media/noimage.jpg";
import { useContext, useEffect, useState } from "react";
import { OrdersContext } from "../store/storage";
import { deleteAll, deleteOrder, isFound, update } from "../helpers/storage";
import { ICategory, IStorageOrder } from "../server/interfaces";
import { ModalContext } from "../store/modal";
import Toast from "../components/utils/toast";
import { FormContext } from "../store/form";
import emptyImg from "../public/media/empty.jpg";
import { TranslationsContext } from "../store/translations";
import { getCategories } from "../server/api";
interface PageProps {
  categories: ICategory[];
}
export default function Page(categories: PageProps) {
  const { orders, setOrders, total } = useContext(OrdersContext);
  const { setIsModal, setVariant } = useContext(ModalContext);
  const { isSuccess } = useContext(FormContext);
  const { t } = useContext(TranslationsContext);
  return (
    <>
      <CustomHead
        title={`Premium Pipe | ${t["main.cart"]}`}
        desc={""}
        canonical={"/cart"}
      />
      <Layout categories={categories.categories}>
        <IntroSection location={t["main.cart"]} title={t["main.our_cart"]} />
        <section>
          <div className="minibox">
            {orders.length > 0 ? (
              <div className={styles.section_inner}>
                <div className={styles.inner_top}>
                  <div className={styles.top_intro}>
                    <h3 className={styles.intro_title}>
                      {t["main.your_order"]}
                    </h3>
                    <button onClick={() => deleteAll(setOrders)}>
                      {t["main.delete_all"]}
                    </button>
                  </div>
                  <ul className={styles.orders_list}>
                    {orders.map((order: IStorageOrder) => {
                      return <OrderCard key={order.id} order={order} />;
                    })}
                  </ul>
                </div>
                <div className={styles.inner_bottom}>
                  <p>
                    {t["main.quantity_of_products"]}: <span>{total}</span>
                  </p>
                  <button
                    className="btn primary-two"
                    onClick={() => {
                      setVariant("store");
                      setIsModal(true);
                    }}
                  >
                    {t["main.purchase_order"]} {cart2}
                  </button>
                </div>
              </div>
            ) : (
              <EmptyComponent />
            )}
          </div>
        </section>
      </Layout>
      <Toast
        variant="success"
        toast={isSuccess ? true : false}
        message={`${t["main.successfully_sent"]!}`}
      />
    </>
  );
}

const EmptyComponent = () => {
  const { t } = useContext(TranslationsContext);
  return (
    <div className={stules.empty_wrapper}>
      <h4 style={{ textAlign: "center" }} className={stules.custom_title}>
        {t["main.cart_empty"]}
      </h4>
      <Image src={emptyImg} alt="empty image" />
    </div>
  );
};

const OrderCard = ({ order }: { order: IStorageOrder }) => {
  const { orders, setOrders } = useContext(OrdersContext);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(isFound(order.id).count);
  }, [orders]);
  const { t } = useContext(TranslationsContext);
  return (
    <li className={styles.card}>
      <div className={styles.card_left}>
        <div className={styles.card_img}>
          <Image
            src={order.image ? order.image : noimage}
            alt={order.title}
            width={140}
            height={105}
            className="image"
          />
        </div>
        <div className={styles.card_info}>
          <h4 className={styles.info_title}>{order.title}</h4>
          <p>
            {t["main.quantity"]}: <span>{count}</span>
          </p>
          <div className="mobile">
            <div className="counter cart">
              <button
                onClick={() => {
                  if (count - 1 <= 0) return;
                  setCount(count - 1);
                  update(order.id, count - 1, setOrders);
                }}
              >
                {minus}
              </button>
              <span>{count}</span>
              <button
                onClick={() => {
                  setCount(count + 1);
                  update(order.id, count + 1, setOrders);
                }}
              >
                {plus}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.card_right}>
        <button
          className={styles.xBtn}
          onClick={() => deleteOrder(order.id, orders, setOrders)}
        >
          {x}
        </button>
        <div className="desktop">
          <div className="counter cart">
            <button
              onClick={() => {
                if (count - 1 <= 0) deleteOrder(order.id, orders, setOrders);
                setCount(count - 1);
                update(order.id, count - 1, setOrders);
              }}
            >
              {minus}
            </button>
            <span>{count}</span>
            <button
              onClick={() => {
                setCount(count + 1);
                update(order.id, count + 1, setOrders);
              }}
            >
              {plus}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
export async function getServerSideProps(ctx: any) {
  const categories = await getCategories(ctx.locale);
  return {
    props: { categories },
  };
}
