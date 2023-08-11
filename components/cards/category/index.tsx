import Link from "next/link";
import { ICategory } from "../../../server/interfaces";
import styles from "./category.module.css";
import { arrow_down, elbow_right } from "../../../public/icons";

export default function CategoryCard({ category }: { category: ICategory }) {
  return (
    <Link href={`/categories/${category.slug}`} className={styles.card}>
      <span className={styles.card_title}>{category.title}</span>
      <span className={styles.card_svg}>{elbow_right}</span>
    </Link>
  );
}
