import Layout from "../../components/layout";
import { CustomHead } from "../../components/layout/head";

export default function Home() {
  return (
    <>
      <CustomHead title={"Premium Pipe | News"} desc={""} canonical={`/news`} />
      <Layout>
        <h1>News</h1>
      </Layout>
    </>
  );
}
