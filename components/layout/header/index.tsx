"use client";
import {
  arrow_down,
  bag,
  chevron_down,
  gmail,
  location,
  phone,
  search,
  x,
} from "../../../public/icons";
import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();
  const [isMenu, setIsMenu] = useState(false);
  const [isNumber, setIsNumber] = useState(false);

  return (
    <header className={`${styles.box} `}>
      <div className={styles.container}>
        <div
          className={`${styles.top_cont} ${
            pathname === "/"
              ? `${styles.top_cont} ${styles.top_light}  `
              : styles.top_cont
          } ${
            pathname.includes("/news/")
              ? `${styles.top_cont} ${styles.top_light} `
              : styles.top_cont
          } ${
            pathname.includes("/products")
              ? `${styles.top_cont} ${styles.top_light} `
              : styles.top_cont
          }`}
        >
          <div className={styles.top}>
            <div className={styles.city}>
              <p className={` ${styles.city_name} `}>
                {location}
                Тошкент вилояти, Охангарон шахар, Ангрен Эркин Иктисодий зонаси
                Бирлик МФЙ, 40-уй
              </p>
            </div>
            <div className={styles.contacts_cont}>
              <div className={styles.contacts}>
                <a
                  href={`mailto: `}
                  target={"_blank"}
                  rel="noreferrer"
                  className={styles.mail}
                >
                  {gmail}
                  info@premiumpipe.com
                </a>

                <div className={`${styles.number_cont}`}>
                  <button
                    className={styles.number_btn}
                    onClick={() => setIsNumber(!isNumber)}
                  >
                    {phone} +998 78 122 12 42 {arrow_down}
                  </button>
                  {isNumber ? (
                    <div className={styles.number_inner_cont}>
                      <a
                        href={`tel: `}
                        target={"_blank"}
                        rel="noreferrer"
                        className={styles.phone}
                      >
                        +998 78 122 12 42
                      </a>
                      <a
                        href={`tel: `}
                        target={"_blank"}
                        rel="noreferrer"
                        className={styles.phone}
                      >
                        +998 78 122 12 42
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
              {/* <Lng /> */}
            </div>
          </div>
        </div>
        <div
          className={`${styles.bottom_container} ${
            pathname === "/"
              ? `${styles.bottom_container} ${styles.bottom_light} `
              : styles.bottom_container
          } ${
            pathname.includes("/news/")
              ? `${styles.bottom_container} ${styles.bottom_light} `
              : styles.bottom_container
          } ${
            pathname.includes("/products")
              ? `${styles.bottom_container} ${styles.bottom_light} `
              : styles.bottom_container
          }`}
        >
          <div className={`${styles.bottom}`}>
            <div className={styles.btm_left}>
              <div className={styles.img_cont}>
                <Link href={"/"} className={styles.logo}></Link>
              </div>
              <div className={styles.nav_links}>
                <Link href={"/"} className={styles.nav_link}>
                  Главная
                </Link>
                <Link href={"/products"} className={styles.nav_link}>
                  Пpoдукции {chevron_down}
                </Link>
                <Link href={"/about"} className={styles.nav_link}>
                  О компании
                </Link>
                <Link href={"/news"} className={styles.nav_link}>
                  Новости
                </Link>
                <Link href={"/gallery"} className={styles.nav_link}>
                  Галерея
                </Link>
                <Link href={"/contact"} className={styles.nav_link}>
                  Контакты
                </Link>
              </div>
            </div>
            <div className={styles.btm_right}>
              <Link href={"/search"}>
                <input
                  type="text"
                  placeholder={`Поиск `}
                  className={styles.search}
                />
              </Link>

              <Link href={"/cart"} className={styles.cart}>
                {bag} Корзина
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mobile}>
        <div className={styles.mobile_top}>
          <div className={styles.img_cont}>
            <Link href={"/"} className={styles.logo}>
              {/* <Image
                src={"/media/logo.png"}
                width={140}
                height={56}
                alt="logo of the company"
                className={styles.img}
              /> */}
            </Link>
          </div>
          <div>{/* <Lng /> */}</div>
        </div>
        <div className={styles.mobile_bottom}>
          <Link href={"/search"} className={styles.search_bar}>
            <input
              type="text"
              placeholder={`Поиск `}
              className={styles.search}
            />
          </Link>
          <div
            className={`${styles.hamburger} ${isMenu ? styles.open : null}`}
            // onClick={() => setIsMenu(!isMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {/* {isMenu ? <MobileMenu /> : null} */}
      </div>
    </header>
  );
}
// const MobileMenu = () => {
//   const [isMenu, setIsMenu] = useState(false);
//   return (
//     <section className={styles.mobile_menu}>
//       <div className={styles.navigate}>
//         <button className={styles.close} onClick={() => setIsMenu(!isMenu)}>
//           {x}
//         </button>
//         <p className={styles.menu}>Menu</p>
//       </div>
//       <div className={styles.navbar_mobile_container}>
//         <Accordion allowToggle className={styles.accordion_btn}>
//           <AccordionItem>
//             <AccordionButton className={styles.ac_btn}>
//               <Box as="span" flex="1" textAlign="left">
//                 Product
//               </Box>
//             </AccordionButton>

//             <AccordionPanel className={` ${styles.accordion_link}`}>
//               <Link href={"/"}>All products</Link>
//               <Link href={"/"}>Calculator</Link>
//             </AccordionPanel>
//           </AccordionItem>
//         </Accordion>
//       </div>
//     </section>
//   );
// };
