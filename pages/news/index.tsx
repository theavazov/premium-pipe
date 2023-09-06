import { useQuery } from "react-query";
import NewsCard from "../../components/cards/news";
import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import IntroSection from "../../components/universal/intro";
import { getCategories, getNews } from "../../server/api";
import styles from "../../styles/news.module.css";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { TranslationsContext } from "../../store/translations";
import { ICategory, INews } from "../../server/interfaces";
import Pagination from "../../components/utils/pagination";
interface PageProps {
  categories: ICategory[];
}
export default function Page(categories: PageProps) {
  const { locale } = useRouter();
  const { t } = useContext(TranslationsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState<INews[]>([]);
  const [current, setCurrent] = useState(1);
  const [max, setMax] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    getNews(locale!, current)
      .then((r) => {
        setMax(r.total_pages);
        setNews(r.results);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [, locale, current]);

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
            {news.length > 0 ? (
              isLoading ? (
                <div className="products_container">
                  <div className="skeleton article"></div>
                  <div className="skeleton article"></div>
                  <div className="skeleton article"></div>
                  <div className="skeleton article"></div>
                </div>
              ) : (
                <>
                  <div className="products_container">
                    {news.map((article) => {
                      return <NewsCard key={article.id} article={article} />;
                    })}
                  </div>
                  <Pagination
                    path="/news"
                    current={current}
                    maximal={max}
                    setPage={setCurrent}
                  />
                </>
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
