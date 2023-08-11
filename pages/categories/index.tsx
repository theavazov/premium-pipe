import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";

export default function Home() {
  return (
    <>
      <CustomHead
        title={"Premium Pipe | Categories"}
        desc={""}
        canonical={`/categories`}
      />
      <Layout>
        <h1>Categories</h1>
      </Layout>
    </>
  );
}
