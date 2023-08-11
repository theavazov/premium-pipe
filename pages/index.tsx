import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";

export default function Home() {
  return (
    <>
      <CustomHead title={"Premium Pipe"} desc={""} canonical={"/"} />
      <Layout>
        <h1>Home</h1>
      </Layout>
    </>
  );
}
