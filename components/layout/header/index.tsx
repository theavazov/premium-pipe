import { useRouter } from "next/router";
import {
  bag,
  chevron_down,
  email,
  location,
  phone,
  search,
} from "../../../public/icons";
import styles from "./header.module.css";
import Link from "next/link";
import { useContext, useState } from "react";
import { searchProducts } from "../../../server/api";
import { FormContext } from "../../../store/form";

interface Props {
  variant: "light" | "dark";
}

export default function Header({ variant }: Props) {
  const { pathname, locale, locales, asPath, push } = useRouter();
  const { setProducts, query, setQuery } = useContext(FormContext);

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

  const [localesDropdown, setLocalesDropdown] = useState(false);
  const [numbersDropdown, setNumbersDropdown] = useState(false);

  return (
    <header className={styles.header}>
      <div className="desktop">
        <div
          className={
            variant === "light"
              ? `${styles.header_top} ${styles.light}`
              : `${styles.header_top} ${styles.dark}`
          }
        >
          <div className={`box ${styles.header_top_inner}`}>
            <a href="#" className={styles.header_top_link}>
              {location} Тошкент вилояти, Охангарон шахар, Ангрен Эркин
              Иктисодий зонаси Бирлик МФЙ, 40-уй
            </a>
            <nav className={styles.header_top_inner_nav}>
              <a href="#" className={styles.header_top_link}>
                {email} info@premiumpipe.com
              </a>
              <div className={styles.header_top_withdropdown}>
                <button
                  className={styles.another_wrapper}
                  onClick={() => setNumbersDropdown(!numbersDropdown)}
                >
                  <div className={styles.header_top_link}>
                    {phone} +998 78 122 12 42
                  </div>
                  {chevron_down}
                </button>
                <div
                  className={
                    numbersDropdown
                      ? `${styles.dropdown} ${styles.show} ${styles.numbers}`
                      : styles.dropdown
                  }
                >
                  <a
                    href="tel: +998 99 121 28 21"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setNumbersDropdown(false)}
                  >
                    +998 99 121 28 21
                  </a>
                </div>
              </div>
              <div className={styles.header_top_withdropdown}>
                <button
                  className={styles.another_wrapper}
                  onClick={() => setLocalesDropdown(!localesDropdown)}
                >
                  <span>{locale}</span>
                  {chevron_down}
                </button>
                <div
                  className={
                    localesDropdown
                      ? `${styles.dropdown} ${styles.show} ${styles.locales}`
                      : styles.dropdown
                  }
                >
                  {locales?.map((sl) => {
                    return (
                      <Link
                        key={sl}
                        href={asPath}
                        locale={sl}
                        onClick={() => setLocalesDropdown(false)}
                      >
                        {sl}
                      </Link>
                    );
                  })}
                </div>
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
              <form
                className={styles.search_wrapper}
                onSubmit={(e) => {
                  e.preventDefault();
                  searchProducts(query)
                    .then((r) => {
                      push("/search");
                      setProducts(r.results);
                    })
                    .catch((e) => console.log(e));
                }}
              >
                <input
                  type="text"
                  placeholder="Поиск"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">{search}</button>
              </form>
              <Link href="/cart" className={styles.nav_link}>
                {bag} Корзина
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile">
        <div
          className={
            variant === "light"
              ? `${styles.header_bottom} ${styles.light}`
              : `${styles.header_bottom} ${styles.dark}`
          }
        >
          <div className={styles.header_bottom_top}>
            <Link
              href="/"
              className={
                variant === "light"
                  ? `${styles.logo} ${styles.light}`
                  : `${styles.logo} ${styles.dark}`
              }
            ></Link>
            <div className={styles.langchanger_wrapper}>
              <button onClick={() => setLocalesDropdown(!localesDropdown)}>
                {locale} {chevron_down}
              </button>
              <div
                className={
                  localesDropdown
                    ? `${styles.dropdown} ${styles.show}`
                    : styles.dropdown
                }
              >
                {locales?.map((sl) => {
                  return (
                    <Link
                      key={sl}
                      href={asPath}
                      locale={sl}
                      onClick={() => setLocalesDropdown(false)}
                    >
                      {sl}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.header_bottom_bottom}>
            <form
              className={styles.search_wrapper}
              onSubmit={(e) => {
                e.preventDefault();
                searchProducts(query)
                  .then((r) => {
                    push("/search");
                    setProducts(r.results);
                  })
                  .catch((e) => console.log(e));
              }}
            >
              <input
                type="text"
                placeholder="Поиск"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">{search}</button>
            </form>
            <button className={styles.hamburger}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
