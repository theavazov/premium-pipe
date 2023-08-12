import NewsCard from "../../components/cards/news";
import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import IntroSection from "../../components/universal/intro";
import { getNews } from "../../server/api";
import { INews } from "../../server/interfaces";
import styles from "../../styles/news.module.css";

export default function Page({ news }: { news: INews[] }) {
  return (
    <>
      <CustomHead title={"Premium Pipe | News"} desc={""} canonical={`/news`} />
      <Layout>
        <IntroSection location="Новости" title="Наши новости" />
        <section>
          <div className={`box ${styles.section_inner}`}>
            <div className="products_container">
              {news.length > 0
                ? news.map((article) => {
                    return <NewsCard key={article.id} article={article} />;
                  })
                : null}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const news = await getNews(ctx.locale);

  return {
    props: { news },
  };
}
