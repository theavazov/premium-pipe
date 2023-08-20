import styles from "./contact.module.css";
import { IMaskInput } from "react-imask";
import { chevron_right } from "../../../public/icons";
import { useContext, useState } from "react";
import { FormContext } from "../../../store/form";
import { IStoreObjectData } from "../../../server/interfaces";
import { storeOrders } from "../../../server/api";
import ReCAPTCHA from "react-google-recaptcha";
import { TranslationsContext } from "../../../store/translations";
export default function ContactsHome() {
  const { isSuccess, setIsSuccess } = useContext(FormContext);
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const { t } = useContext(TranslationsContext);
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11984.110217217702!2d69.32450396245116!3d41.33001418736866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef48a8ed4d0e9%3A0x3772abeffc72e7b8!2sInha%20University%20in%20Tashkent!5e0!3m2!1sen!2s!4v1689777603424!5m2!1sen!2s"
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
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
