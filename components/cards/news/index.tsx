import Link from "next/link";
import styles from "./news.module.css";
import { arrow_right, calendar, eye } from "../../../public/icons";
import { INews } from "../../../server/interfaces";
import Image from "next/image";
import noimage from "../../../public/media/noimage.jpg";
import { useContext } from "react";
import { TranslationsContext } from "../../../store/translations";

export default function NewsCard({ article }: { article: INews }) {
  const { t } = useContext(TranslationsContext);
  return (
    <Link href={`/news/${article.slug}`} className={styles.card}>
      <div className={styles.card_image}>
        <Image
          src={article.image ? article.image : noimage}
          alt={article.title}
          width={400}
          height={250}
          className="image"
        />
      </div>
      <div className={styles.card_body}>
        <div className={styles.card_body_top}>
          <p className={styles.card_title}>{article.title}</p>
          <div className={styles.card_info}>
            <div className={styles.card_info_item}>
              {calendar} {article.date.replaceAll("-", ".")}
            </div>
            <div className={styles.card_info_item}>
              {eye} {article.views}
            </div>
          </div>
        </div>
        <div className={styles.card_body_bottom}>
          <span>{t["main.more"]}</span>
          {arrow_right}
        </div>
      </div>
    </Link>
  );
}
