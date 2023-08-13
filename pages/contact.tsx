import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import IntroSection from "../components/universal/intro";

export default function Page() {
  return (
    <>
      <CustomHead
        title={"Premium Pipe | Contact"}
        desc={""}
        canonical={"/contact"}
      />
      <Layout>
        <IntroSection location={"Контакты"} title="Связаться с нами" />
      </Layout>
    </>
  );
}
