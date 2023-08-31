import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import { getCategories, getMedia } from "../server/api";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import IntroSection from "../components/universal/intro";
import type { ICategory, IGallery } from "../server/interfaces";
import styles from "../styles/gallery.module.css";
import { TranslationsContext } from "../store/translations";
import { chevron_down, imageMask } from "../public/icons";
import Image from "next/image";
import { ModalContext } from "../store/modal";
interface PageProps {
  categories: ICategory[];
}

export default function PageGalleriesPage(categories: PageProps) {
  const { locale } = useRouter();
  const [type, setType] = useState<"image" | "video">("image");
  const [galleries, setGalleries] = useState<IGallery[]>([]);
  const [limit, setLimit] = useState(12);

  const { setVariant, setMedia, setIndex, setIsModal } =
    useContext(ModalContext);

  useEffect(() => {
    getMedia(locale!, type)
      .then((res) => setGalleries(res))
      .catch((e) => console.log(e));
  }, [locale, type]);

  const { t } = useContext(TranslationsContext);

  return (
    <>
      <CustomHead
        title={"Premium Pipe | Gallery"}
        desc={""}
        canonical={"/gallery"}
      />
      <Layout categories={categories.categories}>
        <IntroSection location="Галерея" title="Наша галерея" />
        <section className="wrapper">
          <div className={`box mini_section ${styles.section_inner}`}>
            <div className={styles.btns}>
              {/* <button className={styles.btn}>Все Галерея</button>  -> BU HOZIR KERAK EMAS! */}
              <button
                className={`${
                  type === "image"
                    ? `${styles.btn} ${styles.active} `
                    : styles.btn
                }`}
                onClick={() => setType("image")}
              >
                {t["main.photo_gallery"]}
              </button>
              <button
                className={`${
                  type === "video"
                    ? `${styles.btn} ${styles.active} `
                    : styles.btn
                }`}
                onClick={() => setType("video")}
              >
                {t["main.video_gallery"]}
              </button>
            </div>
            <div className={styles.galleries_container}>
              {galleries.length > 0
                ? galleries.slice(0, limit).map((media, idx) => {
                    return (
                      <div
                        key={idx}
                        className={styles.gallery_card}
                        onClick={() => {
                          setVariant("gallery");
                          setMedia(galleries);
                          setIndex(idx);
                          setIsModal(true);
                        }}
                      >
                        <div className={styles.gallery_card_content}>
                          {media.image ? (
                            <Image
                              src={media.image}
                              alt="media"
                              className="image"
                              width={360}
                              height={360}
                            />
                          ) : (
                            <video className="image" src={media.video}></video>
                          )}
                        </div>
                        <div className={styles.gallery_card_mask}>
                          {imageMask}
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className={styles.limit_btn_box}>
              {limit < galleries.length ? (
                <button
                  onClick={() => setLimit(limit + 4)}
                  className={styles.bottom_btn}
                >
                  {t["main.show_more"]} {chevron_down}
                </button>
              ) : null}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const categories = await getCategories(ctx.locale);
  return {
    props: { categories },
  };
}
