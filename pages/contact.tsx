import { IMaskInput } from "react-imask";
import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import IntroSection from "../components/universal/intro";
import styles from "../styles/contact.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import {
  chevron_right,
  facebook,
  instagram,
  linkedin,
  location2,
  youtube,
} from "../public/icons";
import { FormContext } from "../store/form";
import { useContext, useState } from "react";
import Toast from "../components/utils/toast";
import { ICategory, IStoreObjectData } from "../server/interfaces";
import { getCategories, storeOrders } from "../server/api";
import { TranslationsContext } from "../store/translations";
import { SiteinfoContext } from "../store/siteinfo";
interface PageProps {
  categories: ICategory[];
}
export default function Page(categories: PageProps) {
  const { isSuccess, setIsSuccess } = useContext(FormContext);
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useContext(TranslationsContext);
  const { siteinfo } = useContext(SiteinfoContext);

  let numbers: string[] = [];

  if (siteinfo.nbm != null) {
    numbers = siteinfo.nbm.split("| ");
  }
  const socialmedia = [
    {
      title: "youtube",
      path: siteinfo.youtube,
      icon: youtube,
    },
    {
      title: "facebook",
      path: siteinfo.facebook,
      icon: facebook,
    },
    {
      title: "instagram",
      path: siteinfo.instagram,
      icon: instagram,
    },
  ];
  return (
    <>
      <CustomHead
        title={`Premium Pipe | ${t["main.contact"]}`}
        desc={""}
        canonical={"/contact"}
      />
      <Layout categories={categories.categories}>
        <IntroSection
          location={t["main.contact"]}
          title={t["main.contactus"]}
        />
        <section>
          <div className={`box ${styles.section_inner}`}>
            <div className={styles.left}>
              <div className={styles.map}>
                <div dangerouslySetInnerHTML={{ __html: siteinfo.map }}></div>
              </div>
              <div className={styles.map_content}>
                <div className={styles.bottom_info}>
                  <p className={styles.location_name}>
                    {location2}
                    <span>{siteinfo.adres}</span>
                  </p>
                  <div className={styles.social_media}>
                    <p className={styles.social_title}>
                      {t["main.social_networks"]}
                    </p>
                    <div className={styles.socials}>
                      {socialmedia.map((sm, i: number) => {
                        return (
                          <a
                            key={i}
                            href={sm.path}
                            target={"_blank"}
                            rel="noreferrer"
                            title={sm.title}
                          >
                            {sm.icon}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.titles_div}>
                <h3 className={styles.title}>{t["main.contact"]}</h3>
                <p>{t["main.contact_desc"]}</p>
              </div>
              <form
                className={styles.form_wrapper}
                onSubmit={(e) => {
                  e.preventDefault();

                  const data: IStoreObjectData = {
                    name: name,
                    number: number,
                    email: "",
                    message: message,
                    products: [],
                  };

                  storeOrders(data)
                    .then((res) => {
                      setIsSuccess(true);
                      setName("");
                      setNumber("");
                      setMessage("");
                      setTimeout(() => {
                        setIsSuccess(false);
                      }, 2000);
                    })
                    .catch((e) => console.log(e));
                }}
              >
                <div className={styles.form_inputs}>
                  <input
                    type="text"
                    placeholder={t["main.name"]}
                    className={styles.input}
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                  <IMaskInput
                    mask={"+998 00 000 00 00"}
                    placeholder={t["main.phone_number"]}
                    className={styles.input}
                    value={number}
                    required
                    onChange={(e: any) => setNumber(e.target.value)}
                  />
                  <textarea
                    cols={30}
                    rows={6}
                    className={styles.input}
                    placeholder={t["main.message"]}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className={styles.form_buttons}>
                  <ReCAPTCHA
                    sitekey={`${process.env.NEXT_PUBLIC_SITEKEY}`}
                    onChange={() => setIsValid(true)}
                  />
                  <button
                    type="submit"
                    style={{ opacity: isValid ? "1" : "0.5" }}
                    className="btn primary"
                    disabled={!isValid ? true : false}
                  >
                    {t["main.know_more"]} {chevron_right}
                  </button>
                </div>
              </form>
              <div className={styles.contact_info}>
                <div className={styles.contact_info_inner}>
                  <p className={styles.contacts_info_title}>
                    {t["main.phone_number"]}
                  </p>
                  <a
                    href={`tel: ${numbers[0]}`}
                    target={"_blank"}
                    rel="noreferrer"
                    className={styles.phone}
                  >
                    {numbers[0]}
                  </a>
                </div>
                <div className={styles.contact_info_inner}>
                  <p className={styles.contacts_info_title}>
                    {t["main.email"]}
                  </p>
                  <a
                    href={`mailto: ${siteinfo.email}`}
                    target={"_blank"}
                    rel="noreferrer"
                    className={styles.mail}
                  >
                    {siteinfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
      <Toast
        variant="success"
        toast={isSuccess ? true : false}
        message={`${t["main.successfully_sent"]} !`}
      />
    </>
  );
}
export async function getServerSideProps(ctx: any) {
  const categories = await getCategories(ctx.locale);
  return {
    props: { categories },
  };
}
