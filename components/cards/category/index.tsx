import Link from "next/link";
import { ICategory } from "../../../server/interfaces";
import styles from "./category.module.css";
import { arrow_down, elbow_right } from "../../../public/icons";
import Image from "next/image";
import ImageCategory from "../../utils/image";
export default function CategoryCard({ category }: { category: ICategory }) {
  return (
    <Link href={`/categories/${category.slug}`} className={styles.card}>
      <span className={styles.card_title}>{category.title}</span>
      <span className={styles.card_svg}>{elbow_right}</span>
      <div className={styles.ellipse}></div>
      {category.image ? (
        <div className={styles.images}>
          <ImageCategory category={category} />
        </div>
      ) : null}
    </Link>
  );
}
