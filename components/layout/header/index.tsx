import { useRouter } from "next/router";
import {
  bag,
  chevron_down,
  email,
  location,
  phone,
} from "../../../public/icons";
import styles from "./header.module.css";
import Link from "next/link";

interface Props {
  variant: "light" | "dark";
}

export default function Header({ variant }: Props) {
  const { pathname, locale, locales, asPath } = useRouter();

  const links = [
    {
      name: "Главная",
      path: "/",
      isActive: pathname === "/" ? true : false,
    },
    {
      name: "Пpoдукции",
      path: "/categories",
      isActive: pathname.includes("/categories") ? true : false,
    },
    {
      name: "О компании",
      path: "/about",
      isActive: pathname === "/about" ? true : false,
    },
    {
      name: "Новости",
      path: "/news",
      isActive: pathname.includes("/news") ? true : false,
    },
    {
      name: "Контакты",
      path: "/contact",
      isActive: pathname === "/contact" ? true : false,
    },
  ];

  return (
    <header className={styles.header}>
      <div
        className={
          variant === "light"
            ? `${styles.header_top} ${styles.light}`
            : `${styles.header_top} ${styles.dark}`
        }
      >
        <div className={`box ${styles.header_top_inner}`}>
          <a href="#" className={styles.header_top_link}>
            {location} Тошкент вилояти, Охангарон шахар, Ангрен Эркин Иктисодий
            зонаси Бирлик МФЙ, 40-уй
          </a>
          <nav className={styles.header_top_inner_nav}>
            <a href="#" className={styles.header_top_link}>
              {email} info@premiumpipe.com
            </a>
            <div className={styles.header_top_withdropdown}>
              <button className={styles.another_wrapper}>
                <div className={styles.header_top_link}>
                  {phone} +998 78 122 12 42
                </div>
                {chevron_down}
              </button>
              <div className={styles.header_top_dropdown}></div>
            </div>
            <div className={styles.header_top_withdropdown}>
              <button className={styles.another_wrapper}>
                <span>Py</span>
                {chevron_down}
              </button>
              <div className={styles.header_top_dropdown}></div>
            </div>
          </nav>
        </div>
      </div>
      <div
        className={
          variant === "light"
            ? `${styles.header_bottom} ${styles.light}`
            : `${styles.header_bottom} ${styles.dark}`
        }
      >
        <div className={`box ${styles.header_bottom_inner}`}>
          <nav className={styles.header_bottom_nav}>
            <Link
              href="/"
              className={
                variant === "light"
                  ? `${styles.logo} ${styles.light}`
                  : `${styles.logo} ${styles.dark}`
              }
            ></Link>
            <nav className={styles.header_nav}>
              {links.map((link, i) => {
                return (
                  <Link
                    key={i}
                    href={link.path}
                    className={
                      link.isActive
                        ? `${styles.nav_link} ${styles.active}`
                        : styles.nav_link
                    }
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </nav>
          <div className={styles.header_bottom_div}>
            <Link href="/cart" className={styles.nav_link}>
              {bag} Корзина
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
