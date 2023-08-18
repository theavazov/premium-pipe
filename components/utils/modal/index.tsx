import { Key, useContext, useEffect, useState } from "react";
import styles from "./modal.module.css";
import { ModalContext } from "../../../store/modal";
import { IMaskInput } from "react-imask";
import { chevron_right, x } from "../../../public/icons";
import { storeOrders } from "../../../server/api";
import {
  IObjectOrder,
  IStorageOrder,
  IStoreObjectData,
} from "../../../server/interfaces";
import { OrdersContext } from "../../../store/storage";
import { FormContext } from "../../../store/form";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";

// import { arrowRightBig, xSvg } from "../../public/icons";

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
      ) : variant === "view" ? (
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

  return (
    <div className={`${styles.modal_inner} ${styles.store}`}>
      <div className={styles.store_intro}>
        <p>Заказ на покупку</p>
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
              placeholder="Имя*"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className={styles.store_input}
              placeholder="Электронная почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IMaskInput
              mask={"+998 00 000 00 00"}
              className={styles.store_input}
              placeholder="Номер телефона*"
              value={number}
              onChange={(e: any) => setNumber(e.target.value)}
            />
          </div>
          <textarea
            cols={30}
            rows={6}
            placeholder="Сообщение"
            className={styles.store_input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn primary-two">
          Отправить {chevron_right}
        </button>
      </form>
    </div>
  );
};

const ViewModals = () => {
  return <div className={`${styles.modal_inner} ${styles.view}`}>View</div>;
};

const ViewModal = () => {
  const { media, setIsModal } = useContext(ModalContext);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (typeof media[0] === "object") {
    return (
      <div className={styles.lightbox}>
        <Image
          src={media[0].src}
          alt="media"
          width={1060}
          height={600}
          className="image"
        />
      </div>
    );
  } else if (typeof media[0] === "string") {
    return (
      <div className={styles.thumbs_swiper}>
        <button
          className={styles.modal_closer}
          onClick={() => setIsModal(false)}
        ></button>
        <div className="minibox thumbs_swiper">
          <button className="prevThumb swiperBtn"></button>
          <button className="nextThumb swiperBtn"></button>
          <Swiper
            loop={true}
            spaceBetween={32}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            navigation={{ prevEl: ".prevThumb", nextEl: ".nextThumb" }}
            className="main-swiper"
            keyboard={{ enabled: true }}
          >
            {media.map((img: any, i: Key | null | undefined) => {
              return (
                <SwiperSlide key={i}>
                  <div className={styles.main}>
                    <Image
                      src={img}
                      alt="media"
                      width={1400}
                      height={765}
                      className="image"
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={8}
            slidesPerView={3.2}
            modules={[Navigation, Thumbs, Autoplay]}
            className={styles.thumbs}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            breakpoints={{
              880: {
                slidesPerView: 4.5,
              },
              1400: {
                slidesPerView: 6.5,
              },
            }}
            keyboard={{ enabled: true }}
          >
            {media.map((img: any, i: Key | null | undefined) => {
              return (
                <SwiperSlide key={i}>
                  <div className={styles.thumbs}>
                    <Image
                      src={img}
                      alt="media"
                      width={190}
                      height={140}
                      className="image"
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    );
  }

  return null;
};
