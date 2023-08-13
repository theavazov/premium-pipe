import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import IntroSection from "../components/universal/intro";

export default function Page() {
  return (
    <>
      <CustomHead title={"Premium Pipe | Cart"} desc={""} canonical={"/cart"} />
      <Layout>
        <IntroSection location="Корзина" title="Наша корзина" />
      </Layout>
    </>
  );
}
