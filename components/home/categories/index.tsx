import Link from "next/link";
import styles from "./categories.module.css";
import { arrow_right } from "../../../public/icons";
import { ICategory } from "../../../server/interfaces";
import CategoryCard from "../../cards/category";

export default function CategoriesSection({
  categories,
}: {
  categories: ICategory[];
}) {
  return (
    <section className={styles.section}>
      <div className="box section_inner">
        <div className="section_inner_top">
          <h3 className="section_title">каталог продукции</h3>
          <Link href={"/categories"}>Узнать больше {arrow_right}</Link>
        </div>
        <div className="categories_container">
          {categories.length > 0
            ? categories.map((category) => {
                return <CategoryCard key={category.id} category={category} />;
              })
            : null}
        </div>
      </div>
    </section>
  );
}
