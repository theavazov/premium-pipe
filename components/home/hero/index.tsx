import Link from "next/link";
import {
  chevron_right,
  cup_star,
  hand_stars,
  magnet,
  pie_chart,
} from "../../../public/icons";
import styles from "./hero.module.css";
import Image from "next/image";
import { useContext } from "react";
import { TranslationsContext } from "../../../store/translations";
export default function Intro() {
  const { t } = useContext(TranslationsContext);
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.top_container}>
          <div className={styles.topper}>
            <p className={styles.subtitle}>
              {magnet}
              {t["main.asia_polyplast"]}
            </p>
            <p className={styles.title}>{t["main.asia_polyplast_desc"]}</p>
          </div>
          <Image
            src="/media/homeherobg.png"
            className={styles.image}
            width={236}
            height={236}
            alt="home hero back"
          />
        </div>
        <div className={styles.middle}>
          <div className={styles.video_container}>
            <Image
              src="/media/test-bg.jpg"
              className="image"
              width={1920}
              height={560}
              alt="background image"
            />
          </div>
          <div className={styles.middle_info}>
            <p className={styles.middle_subtitle}>
              {t["main.intro_middle_subtitle"]}
            </p>
            <Link href="/about" className="primary_btn">
              {t["main.about"]} {chevron_right}{" "}
            </Link>
          </div>
        </div>
        <div className={styles.bottom_container}>
          <div className={styles.bottom}>
            <p className={styles.success_title_top}>
              {t["main.success_title_top"]}
            </p>
            <div className={styles.success_container}>
              <div className={styles.success}>
                {pie_chart}
                <p className={styles.success_title}>
                  {t["main.success_title_1"]}
                </p>
              </div>
              <div className={styles.success}>
                {cup_star}
                <p className={styles.success_title}>
                  {t["main.success_title_2"]}
                </p>
              </div>
              <div className={styles.success}>
                {hand_stars}
                <p className={styles.success_title}>
                  {t["main.success_title_3"]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
