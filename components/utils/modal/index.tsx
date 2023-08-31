import { useContext, useEffect, useState } from "react";
import styles from "./modal.module.css";
import { ModalContext } from "../../../store/modal";
import { IMaskInput } from "react-imask";
import { chevron_right, close, x } from "../../../public/icons";
import { storeOrders } from "../../../server/api";
import {
  IGallery,
  IObjectOrder,
  IStorageOrder,
  IStoreObjectData,
} from "../../../server/interfaces";
import { OrdersContext } from "../../../store/storage";
import { FormContext } from "../../../store/form";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { TranslationsContext } from "../../../store/translations";

export default function Modal() {
  const { variant, setIsModal } = useContext(ModalContext);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const target = e.target as Element;
      if (target?.className === styles.modal) {
        setIsModal(false);
      } else if (target?.className === styles.modal_inner) {
        setIsModal(true);
      }
    });
  }, []);

  return (
    <div className={styles.modal}>
      {variant === "store" ? (
        <StoreModal />
      ) : variant === "gallery" ? (
        <ViewModal />
      ) : null}
    </div>
  );
}

const StoreModal = () => {
  const { setIsModal } = useContext(ModalContext);
  const { orders, setOrders } = useContext(OrdersContext);
  const { setIsSuccess } = useContext(FormContext);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useContext(TranslationsContext);
  return (
    <div className={`${styles.modal_inner} ${styles.store}`}>
      <div className={styles.store_intro}>
        <p>{t["main.orderfor"]}</p>
        <button onClick={() => setIsModal(false)}>{x}</button>
      </div>
      <form
        className={styles.store_form}
        onSubmit={(e) => {
          e.preventDefault();

          let array: IObjectOrder[] = [];

          orders.map((order: IStorageOrder) => {
            let object = {} as IObjectOrder;

            object = {
              id: order.id,
              count: order.count,
            };

            array.push(object);
          });

          const data: IStoreObjectData = {
            name: name,
            number: number,
            email: email,
            message: message,
            products: array,
          };

          storeOrders(data)
            .then((res) => {
              setIsSuccess(true);
              setIsModal(false);
              setOrders([]);
              localStorage.setItem("orders", JSON.stringify([]));
              setTimeout(() => {
                setIsSuccess(false);
              }, 2000);
            })
            .catch((e) => console.log(e));
        }}
      >
        <div className={styles.form_body}>
          <div className={styles.store_form_inputs}>
            <input
              type="text"
              className={styles.store_input}
              placeholder={`${t["main.name"]}*`}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className={styles.store_input}
              placeholder={t["main.email"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IMaskInput
              mask={"+998 00 000 00 00"}
              className={styles.store_input}
              placeholder={`${t["main.phone_number"]}*`}
              value={number}
              onChange={(e: any) => setNumber(e.target.value)}
            />
          </div>
          <textarea
            cols={30}
            rows={6}
            placeholder={t["main.message"]}
            className={styles.store_input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn primary-two">
          {t["main.submit"]} {chevron_right}
        </button>
      </form>
    </div>
  );
};

const ViewModal = () => {
  const { media, setIsModal, index } = useContext(ModalContext);

  return (
    <div className={`${styles.modal_inner} ${styles.zoomed_wrapper_container}`}>
      <button className={styles.modal_closer} onClick={() => setIsModal(false)}>
        {close}
      </button>
      <div className={styles.swiper}>
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={10}
          navigation={{ prevEl: ".prev_modal", nextEl: ".next_modal" }}
          modules={[FreeMode, Navigation]}
          className={styles.swiper1}
          initialSlide={index}
        >
          {media.map((obj: IGallery) => {
            return (
              <SwiperSlide key={obj.id}>
                <div className={styles.main_image}>
                  {obj.image ? (
                    <Image
                      src={obj.image}
                      alt="image"
                      width={300}
                      height={300}
                      className="image"
                    />
                  ) : (
                    <video src={obj.video} className="image" controls></video>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <button className={`${styles.left_btn} prev_modal`}>
        {chevron_right}
      </button>
      <button className={`${styles.right_btn} next_modal`}>
        {chevron_right}
      </button>
    </div>
  );
};
