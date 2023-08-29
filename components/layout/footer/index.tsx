import styles from "./footer.module.css";
import { facebook, instagram, linkedin, youtube } from "../../../public/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { TranslationsContext } from "../../../store/translations";
import { SiteinfoContext } from "../../../store/siteinfo";

export default function Footer() {
  const { pathname } = useRouter();
  const { t } = useContext(TranslationsContext);
  const { siteinfo } = useContext(SiteinfoContext);
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
  let numbers: string[] = [];

  if (siteinfo.nbm != null && typeof siteinfo.nbm === "string") {
    numbers = siteinfo.nbm.split("| ");
  }

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
                {socialmedia.map((sm, i: number) => {
                  return (
                    <a
                      key={i}
                      href={sm.path}
                      target={"_blank"}
                      rel="noreferrer"
                      title={sm.title}
                      className={styles.social_link}
                    >
                      {sm.icon}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.top_container_inner_btm}>
            <div className={styles.contact}>
              <p className={styles.contact_title}>{t["main.phone_number"]}</p>
              {numbers && numbers.length > 0
                ? numbers.map((number, i) => {
                    return (
                      <a
                        key={i}
                        href={`tel: ${number}`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.phone}
                      >
                        {number}
                      </a>
                    );
                  })
                : null}
            </div>
            <div className={styles.contact}>
              <p className={styles.contact_title}>{t["main.email"]}</p>
              <a
                href={`mailto: ${siteinfo.email}`}
                target={"_blank"}
                rel="noreferrer"
                className={styles.email}
              >
                {siteinfo.email}
              </a>
            </div>
            <div className={styles.contact}>
              <p className={styles.contact_title}>{t["main.address"]}</p>
              <p className={styles.contact_info}>{siteinfo.adres}</p>
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
              {t["main.designby"]}
              <a href={"https://ndc.uz/"} target="_blank" rel="noreferrer">
                NDC
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
