import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";

export default function Home() {
  return (
    <>
      <CustomHead
        title={"Premium Pipe | News inner"}
        desc={""}
        canonical={`/news/[slug]`}
      />
      <Layout>
        <h1>News inner</h1>
      </Layout>
    </>
  );
}
