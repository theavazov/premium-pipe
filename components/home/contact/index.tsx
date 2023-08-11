import styles from "./contact.module.css";
import { IMaskInput } from "react-imask";
import { chevron_right } from "../../../public/icons";

export default function ContactsHome() {
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
              <p className={styles.title}>Форма для обратной связи</p>
              <p className={styles.desc}>
                Описываем любые сложные цифровые системы с точки зрения
                требований, составляем подробную проектную документацию
              </p>
            </div>
            <div className={styles.form_container}>
              <form
                className={styles.form_wrapper}
                //  onSubmit={handleRequest}
              >
                <div className={styles.top_form}>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className={styles.name}
                    //   value={name}
                    //   onChange={(e) => setName(e.target.value)}
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
                      // value={number}
                      id="name"
                      // onChange={(e) => setNumber(e.currentTarget.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`${styles.submit} primary_btn`}
                >
                  Отправить {chevron_right}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
