import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";

export default function Home() {
  return (
    <>
      <CustomHead
        title={"Premium Pipe | Seach"}
        desc={""}
        canonical={"/search"}
      />
      <Layout>
        <h1>Search</h1>
      </Layout>
    </>
  );
}
