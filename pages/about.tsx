import dynamic from "next/dynamic";
import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import { getCategories, getPartners } from "../server/api";
import { ICategory, IPartner } from "../server/interfaces";
import styles from "../styles/about.module.css";
import IntroSection from "../components/universal/intro";
import Image from "next/image";
import aboutImg from "../public/media/about-img.jpg";
import { useContext } from "react";
import { TranslationsContext } from "../store/translations";

// Section
const Partners = dynamic(() => import("../components/universal/partners"));

export default function Page({
  partners,
  categories,
}: {
  partners: IPartner[];
  categories: ICategory[];
}) {
  const { t } = useContext(TranslationsContext);

  return (
    <>
      <CustomHead
        title={`Premium Pipe |  ${t["main.about"]}`}
        desc={""}
        canonical={"/about"}
      />
      <Layout categories={categories}>
        <IntroSection location={t["main.about"]} />
        <section>
          <div className={`mediumbox ${styles.section_inner}`}>
            <div className={styles.inner_top}>
              <div className={styles.top_left}>
                <h3 className="section_title">{t["about.jahon_invest"]}</h3>
                <div className={styles.texts}>
                  <p className={styles.text}>{t["about.text1"]}</p>
                  <p className={styles.text}>{t["about.text2"]} </p>
                  <p className={styles.text}>{t["about.text3"]}</p>
                </div>
              </div>
              <div className={styles.top_right}>
                <div className={styles.top_right_div}>
                  <Image
                    src={"/media/logo.svg"}
                    alt="logo"
                    width={178}
                    height={70}
                  />
                </div>
                <div className={styles.top_right_div}>
                  <h4 className={styles.stats_number}>04</h4>
                  <div>
                    <h5 className={styles.stats_title}>
                      {t["about.stats_title1"]}
                    </h5>
                    <p className={styles.stats_text}>
                      {t["about.stats_desc1"]}
                    </p>
                  </div>
                </div>
                <div className={styles.top_right_div}>
                  <h4 className={styles.stats_number}>25</h4>
                  <div>
                    <h5 className={styles.stats_title}>
                      {t["about.stats_title2"]}
                    </h5>
                    <p className={styles.stats_text}>
                      {t["about.stats_desc2"]}
                    </p>
                  </div>
                </div>
                <div className={styles.top_right_div}>
                  <h4 className={styles.stats_number}>0,98</h4>
                  <div>
                    <h5 className={styles.stats_title}>
                      {t["about.stats_title3"]}
                    </h5>
                    <p className={styles.stats_text}>
                      {t["about.stats_desc3"]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.inner_bottom}>
              <div className={styles.inner_bottom_image}>
                <Image src={aboutImg} alt="about image" className="image" />
              </div>
              <p className={styles.text}>{t["about.text4"]}</p>
            </div>
          </div>
        </section>
        <Partners partners={partners} />
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const partners = await getPartners(ctx.locale);
  const categories = await getCategories(ctx.locale);
  return {
    props: { partners, categories },
  };
}
