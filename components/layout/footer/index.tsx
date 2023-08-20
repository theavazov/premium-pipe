import styles from "./footer.module.css";
import { facebook, instagram, linkedin, youtube } from "../../../public/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { TranslationsContext } from "../../../store/translations";

export default function Footer() {
  const { pathname } = useRouter();
  const { t } = useContext(TranslationsContext);

  const navigation = [
    {
      title: t["main.main"],
      path: "/",
      isActive: pathname === "/" ? true : false,
    },
    {
      title: t["main.about"],
      path: "/about",
      isActive: pathname === "/about" ? true : false,
    },
    {
      title: t["main.gallery"],
      path: "/gallery",
      isActive: pathname === "/gallery" ? true : false,
    },
    {
      title: t["main.products"],
      path: "/categories",
      isActive: pathname.includes("/categories") ? true : false,
    },
    {
      title: t["main.news"],
      path: "/news",
      isActive: pathname.includes("/news") ? true : false,
    },
    {
      title: t["main.contact"],
      path: "/contact",
      isActive: pathname === "/contact" ? true : false,
    },
  ];

  return (
    <section
      className={
        pathname === "/" || pathname === "/about"
          ? styles.footer
          : `${styles.margin} ${styles.footer}`
      }
    >
      <div className={`box ${styles.footer_inner}`}>
        <div className={styles.top_container}>
          <div className={styles.top_container_inner_top}>
            <div className={styles.title_cont}>
              <p className={styles.mytitle}>{t["main.contactus"]}</p>
              <p className={styles.title_desc}>
                {t["main.footer_contactus_desc"]}
              </p>
            </div>
            <div className={styles.social_links_cont}>
              <p className={styles.social_links_title}>
                {t["main.social_networks"]}
              </p>
              <div className={styles.social_links}>
                <a
                  href={"/"}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.social_link}
                >
                  {youtube}
                </a>
                <a
                  href={"/"}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.social_link}
                >
                  {facebook}
                </a>
                <a
                  href={"/"}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.social_link}
                >
                  {instagram}
                </a>
                <a
                  href={"/"}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.social_link}
                >
                  {linkedin}
                </a>
              </div>
            </div>
          </div>
          <div className={styles.top_container_inner_btm}>
            <div className={styles.contact}>
              <p className={styles.contact_title}>{t["main.phone_number"]}</p>
              <a href={`tel: +998 78 122 12 42`} className={styles.phone}>
                +998 78 122 12 42
              </a>
              <a href={`tel: +998 78 122 12 42`} className={styles.phone}>
                +998 78 122 12 42
              </a>
            </div>
            <div className={styles.contact}>
              <p className={styles.contact_title}>{t["main.email"]}</p>
              <a
                href={`mailto: info@P-pipe.com`}
                target={"_blank"}
                rel="noreferrer"
                className={styles.email}
              >
                info@p-pipe.com
              </a>
            </div>
            <div className={styles.contact}>
              <p className={styles.contact_title}>{t["main.address"]}</p>
              <p className={styles.contact_info}>
                Юнусабадский район, массив Ташгрес, Улица Боги Шамол
              </p>
            </div>
          </div>
        </div>
        <div className={styles.btm_container}>
          <p className={styles.copyright}>
            {t["main.copyright"]} © {new Date().getFullYear()} Premium Pipe Asia
          </p>
          <div className={styles.footer_links}>
            {navigation.map((link, idx) => {
              return (
                <Link
                  key={idx}
                  href={link.path}
                  className={
                    link.isActive
                      ? `${styles.footer_link} ${styles.active}`
                      : styles.footer_link
                  }
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
          <div className={styles.btm_mb}>
            <p className={styles.copyright_mobile}>
              {t["main.copyright"]} © {new Date().getFullYear()} Premium Pipe
              Asia
            </p>
            <p className={styles.designedby}>
              {t["main.designby"]}{" "}
              <a href={"/"} target="_blank" rel="noreferrer">
                NDC
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
