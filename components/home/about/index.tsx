import { chevron_right } from "../../../public/icons";
import styles from "./about.module.css";
import Image from "next/image";
export default function AboutCompany() {
  return (
    <section className={styles.box}>
      <div className={`box ${styles.container}`}>
        <div className={styles.info_section}>
          <p className={`${styles.section_title} section_title`}>О компании</p>
          <div className={styles.descs}>
            <p className={styles.desc}>
              Компания Premium pipe Asia polyplast является ведущим
              производителем полипропиленовых, полиэтиленовых и ПВХ
              трубопроводов для внутренних и наружных сетей инженерных
              коммуникаций.
            </p>
            <p className={styles.desc}>
              Наша продукция отличается высоким качеством, надежностью и
              долговечностью. Благодаря передовым технологиям и
              профессиональному опыту, компания успешно удовлетворяет
              потребности клиентов в различных отраслях. Она стремится к
              инновациям и устанавливает высокие стандарты в своей отрасли.
            </p>
          </div>
          <button className={`primary_btn ${styles.btn}`}>
            Подробнее {chevron_right}
          </button>
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
        <button className={`primary_btn ${styles.mobile_btn}`}>
          Подробнее {chevron_right}
        </button>
      </div>
    </section>
  );
}
