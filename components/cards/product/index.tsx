import Link from "next/link";
import { IProduct } from "../../../server/interfaces";
import styles from "./product.module.css";
import Image from "next/image";
import { arrow_right } from "../../../public/icons";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Link href={`/product/${product.slug}`} className={styles.card}>
      <div className={styles.card_category}>{product.category}</div>
      <div className={styles.card_image}>
        <Image
          src={product.image ? product.image : ""}
          alt={product.title}
          width={400}
          height={250}
          className="image"
        />
      </div>
      <div className={styles.card_content}>
        <p className={styles.card_title}>{product.title}</p>
        <div className={styles.card_content_body}>
          <span>Подробнее</span>
          {arrow_right}
        </div>
      </div>
    </Link>
  );
}
