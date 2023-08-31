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
const ViewVideo = () => {
  const { media, setIsModal, zoomVideo } = useContext(ModalContext);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
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
          // navigation={{ prevEl, nextEl }}
          navigation={{ prevEl: ".prev_modal", nextEl: ".next_modal" }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.swiper1}
        >
          <SwiperSlide className={styles.swiper1_inner}>
            <video src="https://swiperjs.com/demos/images/nature-1.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <video src="https://swiperjs.com/demos/images/nature-2.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <video src="https://swiperjs.com/demos/images/nature-3.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <video src="https://swiperjs.com/demos/images/nature-4.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <video src="https://swiperjs.com/demos/images/nature-5.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <video src="https://swiperjs.com/demos/images/nature-6.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <video src="https://swiperjs.com/demos/images/nature-7.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <video src="https://swiperjs.com/demos/images/nature-8.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <video src="https://swiperjs.com/demos/images/nature-9.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <video src="https://swiperjs.com/demos/images/nature-10.jpg"></video>
          </SwiperSlide>
        </Swiper>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 4,
              spaceBetween: 8,
            },

            580: {
              slidesPerView: 5,
              spaceBetween: 12,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1400: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1560: {
              slidesPerView: 6,
              spaceBetween: 12,
            },
          }}
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={8}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.thumbs}
        >
          <SwiperSlide className={styles.thumbs_inner}>
            <video src="https://swiperjs.com/demos/images/nature-1.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <video src="https://swiperjs.com/demos/images/nature-2.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <video src="https://swiperjs.com/demos/images/nature-3.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <video src="https://swiperjs.com/demos/images/nature-4.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <video src="https://swiperjs.com/demos/images/nature-5.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <video src="https://swiperjs.com/demos/images/nature-6.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <video src="https://swiperjs.com/demos/images/nature-7.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <video src="https://swiperjs.com/demos/images/nature-8.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <video src="https://swiperjs.com/demos/images/nature-9.jpg"></video>
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <video src="https://swiperjs.com/demos/images/nature-10.jpg"></video>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className={styles.navigation}>
        <button className={`${styles.left_btn} prev_modal`}>
          {chevron_right}
        </button>
        <button className={`${styles.right_btn} next_modal`}>
          {chevron_right}
        </button>
      </div>
    </div>
  );
};
const ViewImage = () => {
  const { media, zoomImage, setIsModal } = useContext(ModalContext);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
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
          // navigation={{ prevEl, nextEl }}
          navigation={{ prevEl: ".prev_modal", nextEl: ".next_modal" }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.swiper1}
        >
          <SwiperSlide className={styles.swiper1_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-1.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-2.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-3.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-4.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-5.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-6.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-7.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-8.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-9.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper1_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-10.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
        </Swiper>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 4,
              spaceBetween: 8,
            },

            580: {
              slidesPerView: 5,
              spaceBetween: 12,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1400: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1560: {
              slidesPerView: 6,
              spaceBetween: 12,
            },
          }}
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={8}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.thumbs}
        >
          <SwiperSlide className={styles.thumbs_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-1.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-2.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-3.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-4.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-5.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-6.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-7.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-8.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-9.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.thumbs_inner}>
            <Image
              src="https://swiperjs.com/demos/images/nature-10.jpg"
              alt="image"
              width={300}
              height={300}
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className={styles.navigation}>
        <button className={`${styles.left_btn} prev_modal`}>
          {chevron_right}
        </button>
        <button className={`${styles.right_btn} next_modal`}>
          {chevron_right}
        </button>
      </div>
    </div>
  );
};
const ViewModal = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const { zoomImage, media, setIsModal, index } = useContext(ModalContext);

  return <></>;
};
