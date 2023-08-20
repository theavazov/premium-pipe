import Link from "next/link";
import { chevron_right } from "../../../public/icons";
import styles from "./about.module.css";
import Image from "next/image";
import { useContext } from "react";
import { TranslationsContext } from "../../../store/translations";
export default function AboutCompany() {
  const { t } = useContext(TranslationsContext);
  return (
    <section className={styles.box}>
      <div className={`box ${styles.container}`}>
        <div className={styles.info_section}>
          <p className={`${styles.section_title} section_title`}>
            {t["main.about"]}
          </p>
          <div className={styles.descs}>
            <p className={styles.desc}>{t["main.about_desc_1"]}</p>
            <p className={styles.desc}>{t["main.about_desc_2"]}</p>
          </div>
          <Link href="/about" className={`primary_btn ${styles.btn}`}>
            {t["main.more"]} {chevron_right}
          </Link>
        </div>
        <div className={styles.images}>
          <Image
            src={"/media/about-img.jpg"}
            width={828}
            height={488}
            alt="about image"
            className="image"
          />
        </div>
        <Link href="/about" className={`primary_btn ${styles.mobile_btn}`}>
          {t["main.more"]} {chevron_right}
        </Link>
      </div>
    </section>
  );
}
