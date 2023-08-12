import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";
import { getSingleProduct } from "../../server/api";
import { IProduct } from "../../server/interfaces";

interface PageProps extends IProduct {
  other_products: IProduct[];
}

export default function Page({ product }: { product: PageProps }) {
  return (
    <>
      <CustomHead
        title={"Product inner"}
        desc={""}
        canonical={`/product/[slug]`}
      />
      <Layout>
        <h1>{product.title}</h1>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const product = await getSingleProduct(ctx.locale, ctx.query.slug);

  return {
    props: { product },
  };
}
