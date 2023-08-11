import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";

export default function Home() {
  return (
    <>
      <CustomHead
        title={"Premium Pipe | Category"}
        desc={""}
        canonical={`/categories/[slug]`}
      />
      <Layout>
        <h1>Categories inner</h1>
      </Layout>
    </>
  );
}
