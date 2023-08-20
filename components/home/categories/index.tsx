import Link from "next/link";
import styles from "./categories.module.css";
import { arrow_right } from "../../../public/icons";
import { ICategory } from "../../../server/interfaces";
import CategoryCard from "../../cards/category";
import { useContext } from "react";
import { TranslationsContext } from "../../../store/translations";

export default function CategoriesSection({
  categories,
}: {
  categories: ICategory[];
}) {
  const { t } = useContext(TranslationsContext);
  return (
    <section className={styles.section}>
      <div className="box section_inner">
        <div className="section_inner_top">
          <h3 className="section_title">{t["main.catalog_products"]}</h3>
          <Link href={"/categories"}>
            {t["main.know_more"]} {arrow_right}
          </Link>
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
