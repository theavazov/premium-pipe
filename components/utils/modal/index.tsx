import { Key, useContext, useEffect, useState } from "react";
import styles from "./modal.module.css";
import { ModalContext } from "../../../store/modal";
import { IMaskInput } from "react-imask";
import { arrow_right, chevron_right, close, x } from "../../../public/icons";
import { storeOrders } from "../../../server/api";
import {
  IObjectOrder,
  IStorageOrder,
  IStoreObjectData,
} from "../../../server/interfaces";
import { OrdersContext } from "../../../store/storage";
import { FormContext } from "../../../store/form";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

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
      ) : variant === "video" ? (
        <ViewVideo />
      ) : variant === "image" ? (
        <ViewImage />
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

const ViewVideo = () => {
  const { media, setIsModal, zoomVideo } = useContext(ModalContext);
  return (
    <div className={`${styles.modal_inner} ${styles.zoomed_wrapper_container}`}>
      <div className={styles.zoomed_wrapper}>
        <button
          className={styles.modal_closer}
          onClick={() => setIsModal(false)}
        >
          {close}
        </button>

        <video src={zoomVideo}></video>
      </div>
    </div>
  );
};
const ViewImage = () => {
  const { zoomImage, setIsModal } = useContext(ModalContext);

  return (
    <div className={`${styles.modal_inner} ${styles.zoomed_wrapper_container}`}>
      <div className={styles.zoomed_wrapper}>
        <button
          className={styles.modal_closer}
          onClick={() => setIsModal(false)}
        >
          {close}
        </button>

        <Image src={zoomImage} alt="zoomed_image" width={960} height={640} />
      </div>
    </div>
  );
};
const ViewModal = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const { zoomImage, media, setIsModal, index } = useContext(ModalContext);

  return (
    <>
      {/* <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.swiper1}
        initialSlide={index}
      >
        <SwiperSlide>
          <Image src={zoomImage} alt="zoomed_image" width={960} height={640} />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.swiper2}
        initialSlide={index}
      >
        {media.length > 0
          ? media.map((med: { image: string | StaticImport }) => {
              console.log(med.image, "!!!!!");
              return (
                <SwiperSlide key={}>
                  <Image
                    src={med.image}
                    alt="zoomed_image"
                    width={960}
                    height={640}
                  />
                </SwiperSlide>
              );
            })
          : null}
      </Swiper> */}
    </>
  );
};
