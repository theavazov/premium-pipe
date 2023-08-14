import dynamic from "next/dynamic";
import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import { getPartners } from "../server/api";
import { IPartner } from "../server/interfaces";
import styles from "../styles/about.module.css";
import IntroSection from "../components/universal/intro";
import Image from "next/image";
import aboutImg from "../public/media/about-img.jpg";
import { useContext } from "react";
import { TranslationsContext } from "../store/translations";

// Section
const Partners = dynamic(() => import("../components/universal/partners"));

export default function Page({ partners }: { partners: IPartner[] }) {
  const { t } = useContext(TranslationsContext);

  return (
    <>
      <CustomHead
        title={"Premium Pipe | About"}
        desc={""}
        canonical={"/about"}
      />
      <Layout>
        <IntroSection location={t["main.about"]} />
        <section>
          <div className={`mediumbox ${styles.section_inner}`}>
            <div className={styles.inner_top}>
              <div className={styles.top_left}>
                <h3 className="section_title">Jahon Invest plast</h3>
                <div className={styles.texts}>
                  <p className={styles.text}>
                    The Premium pipe cluster was founded in October 2018. We
                    have made our task to raise textile production in our
                    country to a new level and bring Uzbekistan to the world
                    leaders of the cotton industry. Also one of the key tasks
                    for us was to remove the stamp from Uzbek cotton as a
                    product of slave labor.
                  </p>
                  <p className={styles.text}>
                    The idea of the “Cot Cluster Economy” is to responsibly grow
                    cotton and deeply all of it to process components, maximize
                    added value and minimize the negative impact on the
                    environment by reusing production waste and with the help of
                    secondary clothing technology processing{" "}
                  </p>
                  <p className={styles.text}>
                    The Premium pipe cluster was founded in October 2018. We
                    have made our task to raise textile production in our
                    country to a new level and bring Uzbekistan to the world
                    leaders of the cotton industry. Ранее Apple уже запустила
                    продажи через онлайн-площадку Tmall, которая принадлежит
                    Alibaba Group. Судя по всему, в компании серьёзно настроены
                    сражаться за китайского потребителя. Несмотря на то что
                    iPhone занимает порядка 20 % местного рынка смартфонов, в
                    первом квартале 2023-го продажи Apple в Китае упали на 5 %.
                    И вряд ли эта цифра радует руководство корпорации.
                  </p>
                </div>
              </div>
              <div className={styles.top_right}>
                <div className={styles.top_right_div}>
                  <Image
                    src={"/media/logo.svg"}
                    alt="logo"
                    width={178}
                    height={70}
                  />
                </div>
                <div className={styles.top_right_div}>
                  <h4 className={styles.stats_number}>04</h4>
                  <div>
                    <h5 className={styles.stats_title}>Производства</h5>
                    <p className={styles.stats_text}>
                      Майки, Трусы и Боксеры, Футболки и Безрукавки,Нижнее бельё
                    </p>
                  </div>
                </div>
                <div className={styles.top_right_div}>
                  <h4 className={styles.stats_number}>25</h4>
                  <div>
                    <h5 className={styles.stats_title}>Летний опыт</h5>
                    <p className={styles.stats_text}>
                      инвестиции в развитие с 1998 года
                    </p>
                  </div>
                </div>
                <div className={styles.top_right_div}>
                  <h4 className={styles.stats_number}>0,98</h4>
                  <div>
                    <h5 className={styles.stats_title}>Тысяч человек</h5>
                    <p className={styles.stats_text}>
                      Общая численность сотрудников
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.inner_bottom}>
              <div className={styles.inner_bottom_image}>
                <Image src={aboutImg} alt="about image" className="image" />
              </div>
              <p className={styles.text}>
                Производственные мощности компании, в цехах которой установлено
                современное оборудование от мировых производителей, среди
                которых вязальные машины Taifan, швейные машины Juki, Brother,
                Siruba и гладильные Malkan, позволяют представлять потребителям
                до 30 тонн полотна и 150-250 тысяч готовых трикотажных изделий в
                месяц.Торговая марка Premium pipe получила повсеместное
                признание благодаря высокому качеству и эстетичности выпускаемой
                продукции.Мужское белье от Premium pipe отлично прилегает к телу
                и гигиенично за счет использования в производстве натуральных
                материалов высокого качества.Вся выпускаемая продукция
                производится из натурального материала – хлопка, выращенного на
                благодатных полях нашей страны.
              </p>
            </div>
          </div>
        </section>
        <Partners partners={partners} />
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const partners = await getPartners(ctx.locale);

  return {
    props: { partners },
  };
}
