import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";

export default function Home() {
  return (
    <>
      <CustomHead
        title={"Premium Pipe | Product"}
        desc={""}
        canonical={`/product/[slug]`}
      />
      <Layout>
        <h1>Product inner</h1>
      </Layout>
    </>
  );
}
