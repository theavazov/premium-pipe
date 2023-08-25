import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import { IGallery, INews } from "../../../server/interfaces";
import Buttons from "../../utils/buttons";
import styles from "./gallery.module.css";
import GalleryCard from "../../cards/gallery";
import { useContext } from "react";
import { TranslationsContext } from "../../../store/translations";
import NewsCard from "../../cards/news/index";

export default function GallerySection({ news }: { news: INews[] }) {
  const { t } = useContext(TranslationsContext);
  return (
    <section className="section">
      <div className="box section_inner">
        <div className="section_inner_top">
          <h3 className="section_title">{t["main.news"]}</h3>
          <Buttons
            variant="chevron"
            prevClass="prev-media"
            nextClass="next-media"
          />
        </div>
        <div className="desktop">
          {news.length > 0 ? (
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
                  spaceBetween: 16,
                },
                1560: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              slidesPerView={"auto"}
              loop={true}
            >
              {news.map((news) => {
                return (
                  <SwiperSlide key={news.id}>
                    <NewsCard article={news} />
                  </SwiperSlide>
                );
              })}
              {news.map((news) => {
                return (
                  <SwiperSlide key={news.id}>
                    <NewsCard article={news} />
                  </SwiperSlide>
                );
              })}
              {news.map((news) => {
                return (
                  <SwiperSlide key={news.id}>
                    <NewsCard article={news} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : null}
        </div>
        <div className="mobile">
          <div className="products_container">
            {news.length > 0
              ? news.map((news) => {
                  return <NewsCard key={news.id} article={news} />;
                })
              : null}
          </div>
        </div>
      </div>
    </section>
  );
}
