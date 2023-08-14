import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import { getCategories, getSingleCategory } from "../../server/api";
import { ICategory } from "../../server/interfaces";
import styles from "../../styles/categories.module.css";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Link from "next/link";
import ProductCard from "../../components/cards/product";

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;

  const { data: category } = useQuery(
    ["category", slug],
    () => getSingleCategory(router.locale!, slug),
    { retry: false }
  );

  const {
    data: categories,
    error,
    isLoading,
  } = useQuery([], () => getCategories(router.locale!), { retry: false });

  return (
    <>
      <CustomHead
        title={category ? category.title : "Loading..."}
        desc={category ? category.desc : ""}
        canonical={`/categories/${slug}`}
      />
      <Layout>
        <section>
          <div className={`box ${styles.intro_inner}`}>
            <div className={styles.intro}>
              <div className={styles.intro_titles}>
                <nav className={styles.breadcrumb}>
                  <Link href="/" className={styles.breadcrumb_el}>
                    Главная
                  </Link>
                  <span className={styles.breadcrumb_el}>/</span>
                  <p className={styles.breadcrumb_el}>Продукции</p>
                </nav>
                <h1 className={styles.intro_title}>{category?.title}</h1>
              </div>
              {category?.desc ? (
                <div
                  className={styles.intro_desc}
                  dangerouslySetInnerHTML={{ __html: category.desc }}
                ></div>
              ) : null}
            </div>
          </div>
        </section>
        {categories && categories.length > 0 ? (
          <section>
            <div className={`box ${styles.body_inner}`}>
              <aside className={styles.body_aside}>
                <div className={styles.body_aside_body}>
                  <h4>Категории</h4>
                  <div className={styles.aside_items}>
                    {categories.map((asideCategory: ICategory) => {
                      return (
                        <Link
                          href={`/categories/${asideCategory.slug}`}
                          key={asideCategory.id}
                          className={
                            asideCategory.slug === slug
                              ? `${styles.aside_link} ${styles.active}`
                              : styles.aside_link
                          }
                        >
                          {asideCategory.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </aside>
              <div className={`products_container ${styles.body_content}`}>
                {category && category?.products.length > 0
                  ? category?.products.map((product) => {
                      return <ProductCard key={product.id} product={product} />;
                    })
                  : null}
              </div>
            </div>
          </section>
        ) : null}
      </Layout>
    </>
  );
}