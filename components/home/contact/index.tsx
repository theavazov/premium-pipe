import styles from "./contact.module.css";
import { IMaskInput } from "react-imask";
import { chevron_right } from "../../../public/icons";
import { useContext, useState } from "react";
import { FormContext } from "../../../store/form";
import { IStoreObjectData } from "../../../server/interfaces";
import { storeOrders } from "../../../server/api";
import ReCAPTCHA from "react-google-recaptcha";
import { TranslationsContext } from "../../../store/translations";
import { SiteinfoContext } from "../../../store/siteinfo";
export default function ContactsHome() {
  const { isSuccess, setIsSuccess } = useContext(FormContext);
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const { t } = useContext(TranslationsContext);
  const { siteinfo } = useContext(SiteinfoContext);
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.map}>
          <div dangerouslySetInnerHTML={{ __html: siteinfo.map }}></div>
        </div>
        <div className={styles.box}>
          <div className={styles.inner_container}>
            <div className={styles.title_section}>
              <p className={styles.title}>{t["main.form_title"]}</p>
              <p className={styles.desc}>{t["main.form_desc_home"]}</p>
            </div>
            <div className={styles.form_container}>
              <form
                className={styles.form_wrapper}
                onSubmit={(e) => {
                  e.preventDefault();

                  const data: IStoreObjectData = {
                    name: name,
                    number: number,
                    email: "",
                    message: "",
                    products: [],
                  };

                  storeOrders(data)
                    .then((res) => {
                      setIsSuccess(true);
                      setName("");
                      setNumber("");
                      setTimeout(() => {
                        setIsSuccess(false);
                      }, 2000);
                    })
                    .catch((e) => console.log(e));
                }}
              >
                <div className={styles.top_form}>
                  <input
                    type="text"
                    placeholder={t["main.name"]}
                    className={styles.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className={styles.formwrapper}>
                    <span>+998</span>
                    <IMaskInput
                      className={styles.number}
                      type="text"
                      mask={"(00) 000 00 00"}
                      unmask={true}
                      placeholder=" 33 571 46 56"
                      required
                      value={number}
                      id="name"
                      onChange={(e) => setNumber(e.currentTarget.value)}
                    />
                  </div>
                </div>

                <div className={styles.form_buttons}>
                  <ReCAPTCHA
                    sitekey={`${process.env.NEXT_PUBLIC_SITEKEY}`}
                    onChange={() => setIsValid(true)}
                  />
                  <button
                    type="submit"
                    className={`${styles.submit} primary_btn`}
                  >
                    {t["main.submit"]} {chevron_right}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
