import { IMaskInput } from "react-imask";
import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import IntroSection from "../components/universal/intro";
import styles from "../styles/contact.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { chevron_right } from "../public/icons";
import { FormContext } from "../store/form";
import { useContext, useState } from "react";
import Toast from "../components/utils/toast";
import { IStoreObjectData } from "../server/interfaces";
import { storeOrders } from "../server/api";

export default function Page() {
  const { isSuccess, setIsSuccess } = useContext(FormContext);
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <CustomHead
        title={"Premium Pipe | Contact"}
        desc={""}
        canonical={"/contact"}
      />
      <Layout>
        <IntroSection location={"Контакты"} title="Связаться с нами" />
        <section>
          <div className={`box ${styles.section_inner}`}>
            <div className={styles.left}>
              <div className={styles.map}>
                <div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191884.83987229373!2d69.11455884790136!3d41.282737945974475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2z0KLQvnNoa2VudCwgT2B6YmVraXN0b24!5e0!3m2!1suz!2s!4v1691918218007!5m2!1suz!2s"
                    width="600"
                    height="450"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div className={styles.map_content}></div>
            </div>
            <div className={styles.right}>
              <div className={styles.titles_div}>
                <h3 className={styles.title}>Контакты</h3>
                <p>
                  Давайте обсудим ваш проект, вместе мы найдем решение самых
                  сложных задач
                </p>
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
                    placeholder="Имя"
                    className={styles.input}
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                  <IMaskInput
                    mask={"+998 00 000 00 00"}
                    placeholder="Номер телефона"
                    className={styles.input}
                    value={number}
                    required
                    onChange={(e: any) => setNumber(e.target.value)}
                  />
                  <textarea
                    cols={30}
                    rows={6}
                    className={styles.input}
                    placeholder="Сообщение"
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
                    Узнать больше {chevron_right}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
      <Toast
        variant="success"
        toast={isSuccess ? true : false}
        message={"Muvaffaqiyatli yuborildi!"}
      />
    </>
  );
}
