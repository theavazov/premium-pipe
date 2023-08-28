import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import IntroSection from "../../components/universal/intro";
import { getCategories } from "../../server/api";
import { ICategory } from "../../server/interfaces";
import styles from "../../styles/categories.module.css";
import CategoryCard from "../../components/cards/category";
import { useContext } from "react";
import { TranslationsContext } from "../../store/translations";

export default function Page({ categories }: { categories: ICategory[] }) {
  const { t } = useContext(TranslationsContext);
  return (
    <>
      <CustomHead
        title={`Premium Pipe | ${t["main.category"]}`}
        desc={""}
        canonical={`/categories`}
      />
      <Layout categories={categories}>
        <IntroSection
          location={t["main.products"]}
          title={t["main.catalog_products"]}
        />
        <section>
          <div className={`box categories_container ${styles.section_inner}`}>
            {categories.length > 0
              ? categories.map((category) => {
                  return <CategoryCard key={category.id} category={category} />;
                })
              : null}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const categories = await getCategories(ctx.locale);

  return {
    props: { categories },
  };
}
