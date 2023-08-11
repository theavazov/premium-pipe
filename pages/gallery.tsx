import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";

export default function Home() {
  return (
    <>
      <CustomHead
        title={"Premium Pipe | Gallery"}
        desc={""}
        canonical={"/gallery"}
      />
      <Layout>
        <h1>Gallery</h1>
      </Layout>
    </>
  );
}
