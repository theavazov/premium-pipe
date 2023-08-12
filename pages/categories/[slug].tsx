import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import { getSingleCategory } from "../../server/api";
import { ICategory, IProduct } from "../../server/interfaces";

interface PageProps extends ICategory {
  products: IProduct[];
}

export default function Page({ category }: { category: PageProps }) {
  return (
    <>
      <CustomHead
        title={"Category inner"}
        desc={""}
        canonical={`/categories/[slug]`}
      />
      <Layout>
        <h1>{category.title}</h1>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const category = await getSingleCategory(ctx.locale, ctx.query.slug);

  return {
    props: { category },
  };
}
