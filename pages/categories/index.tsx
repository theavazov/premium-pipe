import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import IntroSection from "../../components/universal/intro";
import { getCategories } from "../../server/api";
import { ICategory } from "../../server/interfaces";
import styles from "../../styles/categories.module.css";
import CategoryCard from "../../components/cards/category";

export default function Page({ categories }: { categories: ICategory[] }) {
  return (
    <>
      <CustomHead
        title={"Premium Pipe | Categories"}
        desc={""}
        canonical={`/categories`}
      />
      <Layout>
        <IntroSection location="Продукции" title="каталог продукции" />
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
