import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import IntroSection from "../../components/universal/intro";
import { getSingleProduct } from "../../server/api";
import { IProduct } from "../../server/interfaces";
import Buttons from "../../components/utils/buttons";
import ProductCard from "../../components/cards/product";
import styles from "../../styles/product.module.css";

interface PageProps extends IProduct {
  other_products: IProduct[];
  images: { id: number; image: string }[];
}

export default function Page({ product }: { product: PageProps }) {
  return (
    <>
      <CustomHead
        title={product.title}
        desc={product.desc}
        canonical={`/product/${product.slug}`}
      />
      <Layout>
        <IntroSection location="Продукции" title="Наши продукты" />
        <section>
          <div className={`box ${styles.section_inner}`}></div>
        </section>
        {product.other_products.length > 0 ? (
          <section className="section">
            <div className="box section_inner">
              <div className="section_inner_top">
                <h3 className="section_title">Другие продукты</h3>
                <Buttons
                  variant="arrow"
                  prevClass="prev-product"
                  nextClass="next-product"
                />
              </div>
              <div>
                <Swiper
                  modules={[Navigation, Autoplay]}
                  speed={800}
                  navigation={{
                    prevEl: ".prev-product",
                    nextEl: ".next-product",
                  }}
                  autoplay={{ delay: 2000, disableOnInteraction: false }}
                  loop={true}
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
                      spaceBetween: 24,
                      slidesPerView: 4.5,
                    },
                  }}
                >
                  {product.other_products.map((product) => {
                    return (
                      <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                      </SwiperSlide>
                    );
                  })}
                  {product.other_products.map((product) => {
                    return (
                      <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                      </SwiperSlide>
                    );
                  })}
                  {product.other_products.map((product) => {
                    return (
                      <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </section>
        ) : null}
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const product = await getSingleProduct(ctx.locale, ctx.query.slug);

  return {
    props: { product },
  };
}
