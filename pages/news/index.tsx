import { useQuery } from "react-query";
import NewsCard from "../../components/cards/news";
import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import IntroSection from "../../components/universal/intro";
import { getNews } from "../../server/api";
import styles from "../../styles/news.module.css";
import { useRouter } from "next/router";

export default function Page() {
  const { locale } = useRouter();
  const { data: news, isLoading } = useQuery("news", () => getNews(locale!), {
    retry: false,
  });

  return (
    <>
      <CustomHead title={"Premium Pipe | News"} desc={""} canonical={`/news`} />
      <Layout>
        <IntroSection location="Новости" title="Наши новости" />
        <section>
          <div className={`box ${styles.section_inner}`}>
            {news && news.length > 0 ? (
              isLoading ? (
                <p>loading...</p>
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
