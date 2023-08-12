import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";

export default function Page() {
  return (
    <>
      <CustomHead title={"Premium Pipe | Cart"} desc={""} canonical={"/cart"} />
      <Layout>
        <h1>Cart</h1>
      </Layout>
    </>
  );
}
