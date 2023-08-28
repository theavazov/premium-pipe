import { useQuery } from "react-query";
import NewsCard from "../../components/cards/news";
import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import IntroSection from "../../components/universal/intro";
import { getCategories, getNews } from "../../server/api";
import styles from "../../styles/news.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import { TranslationsContext } from "../../store/translations";
import { ICategory } from "../../server/interfaces";
interface PageProps {
  categories: ICategory[];
}
export default function Page(categories: PageProps) {
  const { locale } = useRouter();
  const { data: news, isLoading } = useQuery("news", () => getNews(locale!), {
    retry: false,
  });
  const { t } = useContext(TranslationsContext);
  return (
    <>
      <CustomHead
        title={`Premium Pipe | ${t["main.news"]}`}
        desc={""}
        canonical={`/news`}
      />
      <Layout categories={categories.categories}>
        <IntroSection location={t["main.news"]} title={t["main.our_news"]} />
        <section>
          <div className={`box ${styles.section_inner}`}>
            {news && news.length > 0 ? (
              isLoading ? (
                <p>{t["main.loading"]}...</p>
              ) : (
                <div className="products_container">
                  {news.map((article) => {
                    return <NewsCard key={article.id} article={article} />;
                  })}
                </div>
              )
            ) : null}
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
