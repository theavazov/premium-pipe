import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import { IGallery } from "../../../server/interfaces";
import Buttons from "../../utils/buttons";
import styles from "./gallery.module.css";
import GalleryCard from "../../cards/gallery";

export default function GallerySection({
  galleries,
}: {
  galleries: IGallery[];
}) {
  return (
    <section className="section">
      <div className="box section_inner">
        <div className="section_inner_top">
          <h3 className="section_title">Галерея</h3>
          <Buttons
            variant="chevron"
            prevClass="prev-media"
            nextClass="next-media"
          />
        </div>
        <div className="desktop">
          {galleries.length > 0 ? (
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{ prevEl: ".prev-media", nextEl: ".next-media" }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              speed={800}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                1400: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              slidesPerView={"auto"}
              loop={true}
            >
              {galleries.map((media) => {
                return (
                  <SwiperSlide key={media.id}>
                    <GalleryCard gallery={media} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : null}
        </div>
        <div className="mobile">
          <div className="products_container">
            {galleries.length > 0
              ? galleries.map((media) => {
                  return <GalleryCard key={media.id} gallery={media} />;
                })
              : null}
          </div>
        </div>
      </div>
    </section>
  );
}
