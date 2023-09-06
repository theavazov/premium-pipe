import Link from "next/link";
import { IProduct } from "../../../server/interfaces";
import styles from "./product.module.css";
import Image from "next/image";
import { arrow_right, dot } from "../../../public/icons";
import noimage from "../../../public/media/noimage.jpg";
import { useContext } from "react";
import { TranslationsContext } from "../../../store/translations";

export default function ProductCard({ product }: { product: IProduct }) {
  const { t } = useContext(TranslationsContext);

  return (
    <Link href={`/product/${product.slug}`} className={styles.card}>
      <div className={styles.card_category}>
        {dot} {product.category.title}
      </div>
      <div className={styles.card_image}>
        <Image
          src={product.image ? product.image : noimage}
          alt={product.title}
          width={400}
          height={250}
          className={`image ${styles.image}`}
        />
      </div>
      <div className={styles.card_content}>
        <p className={styles.card_title}>{product.title}</p>
        <div className={styles.card_content_body}>
          <span>{t["main.more"]}</span>
          {arrow_right}
        </div>
      </div>
    </Link>
  );
}
