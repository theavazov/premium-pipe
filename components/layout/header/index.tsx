import { useRouter } from "next/router";
import {
  bag,
  chevron_down,
  close,
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
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { TranslationsContext } from "../../../store/translations";
import OrdersContextProvider, { OrdersContext } from "../../../store/storage";
import { SiteinfoContext } from "../../../store/siteinfo";
interface Props {
  variant: "light" | "dark";
}

export default function Header({ variant }: Props) {
  const { pathname, locale, locales, asPath, push } = useRouter();
  const { setProducts, query, setQuery } = useContext(FormContext);
  const { siteinfo } = useContext(SiteinfoContext);
  const { t } = useContext(TranslationsContext);
  const links = [
    {
      name: t["main.main"],
      path: "/",
      isActive: pathname === "/" ? true : false,
    },
    {
      name: t["main.about"],
      path: "/about",
      isActive: pathname === "/about" ? true : false,
    },
    {
      name: t["main.gallery"],
      path: "/gallery",
      isActive: pathname === "/gallery" ? true : false,
    },
    {
      name: t["main.products"],
      path: "/categories",
      isActive: pathname.includes("/categories") ? true : false,
    },
    {
      name: t["main.news"],
      path: "/news",
      isActive: pathname.includes("/news") ? true : false,
    },
    {
      name: t["main.contact"],
      path: "/contact",
      isActive: pathname === "/contact" ? true : false,
    },
  ];
  /*siteinfo:

{

  logo_first: null,

  logo_second: null,

  title: 'Premium pipe',

  subtitle: '',

  description: null,

  about_us: null,

adres: 

    'Тошкент вилояти, Охангарон шахар, Ангрен Эркин Иктисодий зонаси Бирлик МФЙ, 40-уй',

  email: 'info@P-pipe.com',

  telegram: 'https://t.me/ilkhomjon_rustamov',

  instagram: 'https://www.instagram.com/ilkhomjon_rustamov/',

  facebook: 'https://www.instagram.com/ilkhomjon_rustamov/',

  youtube: 'https://www.instagram.com/ilkhomjon_rustamov/',

  nbm: '+998 91 528 53 33 | +998 98 700 20 20',

map: 

    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23965.30967953781!2d69.32322355764158!3d41.337925475708296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef48a8ed4d0e9%3A0x3772abeffc72e7b8!2sInha%20University%20in%20Tashkent!5e0!3m2!1sen!2s!4v1691419672002!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',

  work_time: '',

  catalog: null,

  certificates: null,

  tech_info: null,

  meta_title: null

} */

  const [localesDropdown, setLocalesDropdown] = useState(false);
  const [numbersDropdown, setNumbersDropdown] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const { orders } = useContext(OrdersContext);
  let numbers: string[] = [];

  if (siteinfo.nbm != null && typeof siteinfo.nbm === "string") {
    numbers = siteinfo.nbm.split("| ");
  }

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
              {location} {siteinfo.adres}
            </a>
            <nav className={styles.header_top_inner_nav}>
              <a href="#" className={styles.header_top_link}>
                {email} {siteinfo.email}
              </a>
              <div className={styles.header_top_withdropdown}>
                <button
                  className={styles.another_wrapper}
                  onClick={() => setNumbersDropdown(!numbersDropdown)}
                >
                  <div className={styles.header_top_link}>
                    {phone} {siteinfo.nbm}
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
                  placeholder={t["main.search"]}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">{search}</button>
              </form>
              <Link href="/cart" className={styles.nav_link}>
                <div
                  data-number={orders.length ? orders.length : null}
                  className={styles.cart_svg}
                >
                  {bag}
                </div>
                {t["main.cart"]}
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
                placeholder={t["main.cart"]}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">{search}</button>
            </form>
            <button
              className={styles.hamburger}
              onClick={() => setIsMenu(!isMenu)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        {isMenu ? <MobileMenu setIsMenu={setIsMenu} variant={variant} /> : null}
      </div>
    </header>
  );
}
const MobileMenu = ({ setIsMenu, variant }: any) => {
  const { pathname } = useRouter();
  const { t } = useContext(TranslationsContext);
  return (
    <section
      className={`${styles.mobile_menu}
    ${
      variant === "light"
        ? `${styles.mobile_menu} ${styles.light}`
        : `${styles.mobile_menu} ${styles.dark}`
    }
    `}
    >
      <div className={styles.navigation}>
        <button className={styles.close} onClick={() => setIsMenu()}>
          {close}
        </button>
        <p className={styles.menu}>Menu</p>
        <div></div>
      </div>
      <div className={styles.navbar_mobile_container}>
        <nav className={styles.header_nav}>
          <Link
            href={"/"}
            className={`${
              pathname === "/"
                ? `${styles.nav_link} ${styles.active}`
                : styles.nav_link
            }`}
          >
            {t["main.main"]}
          </Link>
          <Link
            href={"/about"}
            className={`${
              pathname === "/about"
                ? `${styles.nav_link} ${styles.active}`
                : styles.nav_link
            }`}
          >
            {t["main.about"]}
          </Link>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className={styles.nav_link}
                  >
                    {t["main.products"]} <AccordionIcon />
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className={styles.nav_inner_links}>
                <Link
                  href={"/"}
                  className={
                    pathname === "/"
                      ? `${styles.nav_inner_link} ${styles.active}`
                      : styles.nav_inner_link
                  }
                >
                  Полипропиленовые трубы/композиты
                </Link>
                <Link
                  href={"/"}
                  className={
                    pathname === "/"
                      ? `${styles.nav_inner_link} ${styles.active}`
                      : styles.nav_inner_link
                  }
                >
                  Полипропиленовые фитинги
                </Link>
                <Link
                  href={"/"}
                  className={
                    pathname === "/"
                      ? `${styles.nav_inner_link} ${styles.active}`
                      : styles.nav_inner_link
                  }
                >
                  Канализационные трубы и фитинги из пвх
                </Link>
                <Link
                  href={"/"}
                  className={
                    pathname === "/"
                      ? `${styles.nav_inner_link} ${styles.active}`
                      : styles.nav_inner_link
                  }
                >
                  Канализационные трубы и фитинги из полипропилена (бесшумные)
                </Link>
                <Link
                  href={"/"}
                  className={
                    pathname === "/"
                      ? `${styles.nav_inner_link} ${styles.active}`
                      : styles.nav_inner_link
                  }
                >
                  Aqua pipe
                </Link>
                <Link
                  href={"/"}
                  className={
                    pathname === "/"
                      ? `${styles.nav_inner_link} ${styles.active}`
                      : styles.nav_inner_link
                  }
                >
                  Полиэтиленовые трубы
                </Link>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Link
            href={"/gallery"}
            className={`${
              pathname === "/gallery"
                ? `${styles.nav_link} ${styles.active}`
                : styles.nav_link
            }`}
          >
            {t["main.gallery"]}
          </Link>
          <Link
            href={"/news"}
            className={`${
              pathname === "/news"
                ? `${styles.nav_link} ${styles.active}`
                : styles.nav_link
            }`}
          >
            {t["main.news"]}
          </Link>
          <Link
            href={"/contact"}
            className={`${
              pathname === "/contact"
                ? `${styles.nav_link} ${styles.active}`
                : styles.nav_link
            }`}
          >
            {t["main.contact"]}
          </Link>
        </nav>
      </div>
    </section>
  );
};
