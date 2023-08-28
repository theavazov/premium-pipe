import Image from "next/image";
import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import { getCategories, getSingleNews } from "../../server/api";
import { ICategory, INews } from "../../server/interfaces";
import styles from "../../styles/news.module.css";
import { calendar, eye } from "../../public/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import Buttons from "../../components/utils/buttons";
import NewsCard from "../../components/cards/news";
import noimage from "../../public/media/noimage.jpg";
import { useContext } from "react";
import { TranslationsContext } from "../../store/translations";

interface PageProps extends INews {
  other_news: INews[];
  text: string;
}

export default function Page({
  article,
  categories,
}: {
  article: PageProps;
  categories: ICategory[];
}) {
  const { t } = useContext(TranslationsContext);
  return (
    <>
      <CustomHead
        title={article.title}
        desc={article.text}
        canonical={`/news`}
      />
      <Layout categories={categories}>
        <section>
          <div className={`minibox ${styles.wrapper}`}>
            <div className={styles.inner_top}>
              <h1 className={styles.article_title}>{article.title}</h1>
              <div className={styles.inner_info}>
                <div className={styles.info_item}>
                  {calendar} {article.date.replaceAll("-", ".")}
                </div>
                <div className={styles.info_item}>
                  {eye} {article.views}
                </div>
              </div>
            </div>
            <div className={styles.inner_body}>
              <div className={styles.article_image}>
                <Image
                  src={article.image ? article.image : noimage}
                  alt={article.title}
                  width={1100}
                  height={610}
                  className="image"
                />
              </div>
              <div
                className={styles.article_text}
                dangerouslySetInnerHTML={{ __html: article.text }}
              ></div>
            </div>
          </div>
        </section>
        {article.other_news.length > 0 ? (
          <section className="section">
            <div
              className={`box section_inner_top ${styles.other_product_inner}`}
            >
              <h3 className="section_title">{t["main.other_news"]}</h3>
              <Buttons
                variant="arrow"
                prevClass="prev-news"
                nextClass="next-news"
              />
            </div>
            <div style={{ paddingInline: "16px" }}>
              <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}
                speed={800}
                navigation={{ prevEl: ".prev-news", nextEl: ".next-news" }}
                breakpoints={{
                  0: {
                    spaceBetween: 16,
                    slidesPerView: 1,
                  },
                  580: {
                    spaceBetween: 16,
                    slidesPerView: 2.4,
                  },
                  880: {
                    spaceBetween: 16,
                    slidesPerView: 3.4,
                  },
                  1200: {
                    spaceBetween: 16,
                    slidesPerView: 4.5,
                  },
                  1450: {
                    spaceBetween: 24,
                    slidesPerView: 4.5,
                  },
                }}
              >
                {article.other_news.map((article) => {
                  return (
                    <SwiperSlide key={article.id}>
                      <NewsCard article={article} />
                    </SwiperSlide>
                  );
                })}
                {article.other_news.map((article) => {
                  return (
                    <SwiperSlide key={article.id}>
                      <NewsCard article={article} />
                    </SwiperSlide>
                  );
                })}
                {article.other_news.map((article) => {
                  return (
                    <SwiperSlide key={article.id}>
                      <NewsCard article={article} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </section>
        ) : null}
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const article = await getSingleNews(ctx.locale, ctx.query.slug);
  const categories = await getCategories(ctx.locale);
  return {
    props: { article, categories },
  };
}
