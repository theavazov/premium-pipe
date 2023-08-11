import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";

export default function Home() {
  return (
    <>
      <CustomHead
        title={"Premium Pipe | Contact"}
        desc={""}
        canonical={"/contact"}
      />
      <Layout>
        <h1>Contact</h1>
      </Layout>
    </>
  );
}
