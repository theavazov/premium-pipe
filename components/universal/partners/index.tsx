import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import { IPartner } from "../../../server/interfaces";
import Buttons from "../../utils/buttons";
import styles from "./partners.module.css";
import Image from "next/image";

export default function UniversalPartners({
  partners,
}: {
  partners: IPartner[];
}) {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`box section_inner ${styles.partners_inner}`}>
        <div className="section_inner_top">
          <h3 className="section_title">Наши партнеры</h3>
          <Buttons prevClass="prev-partner" nextClass="next-partner" />
        </div>
        <div>
          {partners.length > 0 ? (
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{ prevEl: ".prev-partner", nextEl: ".next-partner" }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              speed={800}
              breakpoints={{
                0: {
                  slidesPerView: 1.5,
                  spaceBetween: 8,
                },
                380: {
                  slidesPerView: 2.5,
                  spaceBetween: 8,
                },
                580: {
                  slidesPerView: 3,
                  spaceBetween: 12,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 12,
                },
                1400: {
                  slidesPerView: 6,
                  spaceBetween: 12,
                },
              }}
              slidesPerView={"auto"}
              loop={true}
            >
              {partners.map((partner) => {
                return (
                  <SwiperSlide key={partner.id}>
                    <div className={styles.card}>
                      <Image
                        src={partner.image ? partner.image : ""}
                        alt={partner.name}
                        width={260}
                        height={130}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : null}
        </div>
      </div>
    </section>
  );
}
