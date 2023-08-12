import Link from "next/link";
import styles from "./intro.module.css";

interface ComponentProps {
  location: string;
  title?: string;
}

export default function IntroSection({ location, title }: ComponentProps) {
  return (
    <section className={styles.section}>
      <div className={`box ${styles.section_inner}`}>
        <h1 className={styles.section_title}>{title ? title : location}</h1>
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumb_element}>
            Главная
          </Link>
          <span className={styles.breadcrumb_element}>/</span>
          <p className={styles.breadcrumb_element}>{location}</p>
        </nav>
      </div>
    </section>
  );
}
