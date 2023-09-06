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
import { ICategory } from "../../../server/interfaces";
interface Props {
  variant: "light" | "dark";
  categories: ICategory[];
}
import { useEffect } from "react";

export default function Header({ variant, categories }: Props) {
  const { pathname, locale, locales, asPath, push } = useRouter();
  const { setProducts, query, setQuery } = useContext(FormContext);
  const { siteinfo } = useContext(SiteinfoContext);
  const { t } = useContext(TranslationsContext);
  const [localesDropdown, setLocalesDropdown] = useState(false);
  const [numbersDropdown, setNumbersDropdown] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const { orders } = useContext(OrdersContext);
  let numbers: string[] = [];

  if (siteinfo.nbm != null && typeof siteinfo.nbm === "string") {
    numbers = siteinfo.nbm.split("| ");
  }
  useEffect(() => {
    if (pathname != "/search") {
      setQuery("");
    }
  }, [pathname]);
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
              <a
                href={`mailto: ${siteinfo.email}`}
                target={"_blank"}
                rel="noreferrer"
                className={styles.header_top_link}
              >
                {email} {siteinfo.email}
              </a>
              <div className={styles.header_top_withdropdown}>
                <button
                  className={styles.another_wrapper}
                  onClick={() => setNumbersDropdown(!numbersDropdown)}
                >
                  <div className={styles.header_top_link}>
                    {phone} {numbers[0]}
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
                  {numbers && numbers.length > 0
                    ? numbers.map((number, i) => {
                        return (
                          <a
                            key={i}
                            href={`tel: ${number}`}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.ft_navlink}
                            onClick={() => setNumbersDropdown(false)}
                          >
                            {number}
                          </a>
                        );
                      })
                    : null}
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
                <div className={styles.header_top_withdropdown}>
                  <a
                    className={`${styles.another_wrapper_product} ${
                      pathname === "/products"
                        ? `${styles.nav_link} ${styles.active}`
                        : styles.nav_link
                    }`}
                    href={`/categories`}
                  >
                    {t["main.products"]} {chevron_down}
                  </a>
                  <div
                    className={` ${styles.dropdown_prod} ${styles.dropdown}  `}
                  >
                    {categories.length > 0
                      ? categories.map((category) => {
                          return (
                            <Link
                              key={category.id}
                              href={`/categories/${category.slug}`}
                              onClick={() => setProductDropdown(false)}
                              className={`${
                                pathname === `/categories/${category.slug}`
                                  ? `${styles.nav_link} ${styles.active}`
                                  : styles.nav_link
                              }`}
                            >
                              {category.title}
                            </Link>
                          );
                        })
                      : null}
                  </div>
                </div>
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
                  required
                />
                <button type="submit">{search}</button>
              </form>
              <Link href="/cart" className={styles.nav_link}>
                <div
                  data-number={orders.length > 0 ? orders.length : null}
                  className={`${
                    orders.length > 0
                      ? `${styles.cart_svg} ${styles.order_number}`
                      : styles.cart_svg
                  }`}
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
            <Link href="/cart" className={styles.nav_link}>
              <div
                data-number={orders.length > 0 ? orders.length : null}
                className={`${
                  orders.length > 0
                    ? `${styles.cart_svg} ${styles.order_number}`
                    : styles.cart_svg
                }`}
              >
                {bag}
              </div>
            </Link>
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
        {isMenu ? (
          <MobileMenu
            setIsMenu={setIsMenu}
            variant={variant}
            categories={categories}
          />
        ) : null}
      </div>
    </header>
  );
}
const MobileMenu = ({
  setIsMenu,
  variant,
  categories,
}: {
  setIsMenu: any;
  variant: any;
  categories: ICategory[];
}) => {
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
        <p className={styles.menu}>{t["main.menu"]}</p>
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
                {categories.length > 0
                  ? categories.map((category) => {
                      return (
                        <Link
                          key={category.id}
                          href={`/categories/${category.slug}`}
                          className={
                            pathname === "/"
                              ? `${styles.nav_inner_link} ${styles.active}`
                              : styles.nav_inner_link
                          }
                        >
                          {category.title}
                        </Link>
                      );
                    })
                  : null}
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
