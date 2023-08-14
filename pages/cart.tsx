import Image from "next/image";
import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import IntroSection from "../components/universal/intro";
import { cart2, minus, plus, x } from "../public/icons";
import styles from "../styles/cart.module.css";
import noimage from "../public/media/noimage.jpg";
import { useState } from "react";

export default function Page() {
  return (
    <>
      <CustomHead title={"Premium Pipe | Cart"} desc={""} canonical={"/cart"} />
      <Layout>
        <IntroSection location="Корзина" title="Наша корзина" />
        <section>
          <div className="minibox">
            <div className={styles.section_inner}>
              <div className={styles.inner_top}>
                <div className={styles.top_intro}>
                  <h3 className={styles.intro_title}>Ваш заказ</h3>
                  <button>Удалить все</button>
                </div>
                <ul className={styles.orders_list}>
                  <OrderCard />
                  <OrderCard />
                  <OrderCard />
                </ul>
              </div>
              <div className={styles.inner_bottom}>
                <p>
                  Количество продуктов: <span>3</span>
                </p>
                <button className="btn primary-two">
                  Заказ на покупку {cart2}
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

const OrderCard = () => {
  const [count, setCount] = useState(1);

  return (
    <li className={styles.card}>
      <div className={styles.card_left}>
        <div className={styles.card_img}>
          <Image
            src={noimage}
            alt="order-title"
            width={140}
            height={105}
            className="image"
          />
        </div>
        <div className={styles.card_info}>
          <h4 className={styles.info_title}>Тройник 90° канализационный</h4>
          <p>
            Количество: <span>{count}</span>
          </p>
          <div className="mobile">
            <div className="counter">
              <button onClick={() => setCount(count - 1)}>{minus}</button>
              <span>{count}</span>
              <button onClick={() => setCount(count + 1)}>{plus}</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.card_right}>
        <button className={styles.xBtn}>{x}</button>
        <div className="desktop">
          <div className="counter">
            <button onClick={() => setCount(count - 1)}>{minus}</button>
            <span>{count}</span>
            <button onClick={() => setCount(count + 1)}>{plus}</button>
          </div>
        </div>
      </div>
    </li>
  );
};
