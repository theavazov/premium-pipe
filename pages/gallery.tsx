import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import { getMedia } from "../server/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import IntroSection from "../components/universal/intro";
import type { IGallery } from "../server/interfaces";
// import { getMedia } from "../server/api";

import dynamic from "next/dynamic";
import { useContext } from "react";
import styles from "../styles/gallery.module.css";
import { ModalContext } from "../store/modal";
import GalleryCard from "../components/cards/gallery";
export default function PageGalleriesPage({
  galleries,
}: {
  galleries: IGallery[];
}) {
  {
    const { locale } = useRouter();
    const [type, setType] = useState<"image" | "video">("image");

    useEffect(() => {
      getMedia(locale!, type)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    }, [locale, type]);
    // const { isSuccess } = useContext(FormContext);

    const { setIndex, setMedia, setVariant, setZoomImage, setIsModal } =
      useContext(ModalContext);
    // const handeClick = (event: any, gallery: any, key: any) => {
    //   setIndex(key);
    //   // gallery.image && gallery.image
    //   //   ? setVariant("image"):setZoomImage(gallery.image);
    //   //   : setVariant("video");
    //   setVariant("image");
    //   setZoomImage(gallery.image);
    //   setMedia(gallery);
    //   setIsModal(true);
    // };

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
                <button className={styles.btn}>Все Галерея</button>
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
                  ? galleries.map((media, id) => {
                      return <GalleryCard key={id} gallery={media} />;
                    })
                  : null}
              </div>
            </div>
          </section>
        </Layout>
      </>
    );
  }
}

// GalleriesPage.getInitialProps = async (ctx) => {
//   const galleries = await getMedia(ctx.locale!);

//   return { galleries };
// };
export async function getServerSideProps(ctx: any, variant: any) {
  const galleries = await getMedia(ctx.locale!, variant);
  return {
    props: { galleries },
  };
}
