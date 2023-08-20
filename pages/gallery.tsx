import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import { getMedia } from "../server/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import IntroSection from "../components/universal/intro";
import type { IGallery } from "../server/interfaces";
// import { getMedia } from "../server/api";
import GalleryCard from "../components/cards/gallery";
import dynamic from "next/dynamic";
import { useContext } from "react";
import styles from "../styles/gallery.module.css";
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
