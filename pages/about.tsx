import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";

export default function Home() {
  return (
    <>
      <CustomHead title={"Premium Pipe"} desc={""} canonical={"/about"} />
      <Layout>
        <h1>About</h1>
      </Layout>
    </>
  );
}
