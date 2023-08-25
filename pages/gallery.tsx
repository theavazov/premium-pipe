import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import { getMedia } from "../server/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import IntroSection from "../components/universal/intro";
import type { IGallery } from "../server/interfaces";
import styles from "../styles/gallery.module.css";
import GalleryCard from "../components/cards/gallery";

export default function PageGalleriesPage() {
  const { locale } = useRouter();
  const [type, setType] = useState<"image" | "video">("image");
  const [galleries, setGalleries] = useState<IGallery[]>([]);
  const [limit, setLimit] = useState(4); // MASHI LIMITNI O'ZIZ HOHLAGAN SONGA O'ZGARTRASIZ, PASDAGI LIMIT NECHTAGA KO'PAYISHINI HAM 65-QATORDAGI

  useEffect(() => {
    getMedia(locale!, type)
      .then((res) => setGalleries(res))
      .catch((e) => console.log(e));
  }, [locale, type]);

  return (
    <>
      <CustomHead
        title={"Premium Pipe | Gallery"}
        desc={""}
        canonical={"/gallery"}
      />
      <Layout>
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
                Фотогалерея
              </button>
              <button
                className={`${
                  type === "video"
                    ? `${styles.btn} ${styles.active} `
                    : styles.btn
                }`}
                onClick={() => setType("video")}
              >
                Видеогалерея
              </button>
            </div>
            <div className={styles.galleries_container}>
              {galleries.length > 0
                ? galleries.slice(0, limit).map((media, id) => {
                    return <GalleryCard key={id} gallery={media} />;
                  })
                : null}
            </div>
            {limit < galleries.length ? (
              <button onClick={() => setLimit(limit + 4)}>YANA</button> // MASHI BUTTONNI STYLE INI QVOLARSIZ
            ) : null}
          </div>
        </section>
      </Layout>
    </>
  );
}
