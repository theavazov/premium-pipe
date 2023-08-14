import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import { getMedia } from "../server/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import IntroSection from "../components/universal/intro";

export default function Page() {
  const { locale } = useRouter();
  const [type, setType] = useState<"image" | "video">("image");

  useEffect(() => {
    getMedia(locale!, type)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, [locale, type]);

  return (
    <>
      <CustomHead
        title={"Premium Pipe | Gallery"}
        desc={""}
        canonical={"/gallery"}
      />
      <Layout>
        <IntroSection location="Галерея" title="Наша галерея" />
      </Layout>
    </>
  );
}
