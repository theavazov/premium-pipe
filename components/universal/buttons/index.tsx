import { chevron_right } from "../../../public/icons";
import styles from "./buttons.module.css";

interface ComponentProps {
  prevClass: string;
  nextClass: string;
}

export default function Buttons({ prevClass, nextClass }: ComponentProps) {
  return (
    <div className={styles.buttons}>
      <button
        className={`${styles.btn} ${prevClass}`}
        style={{ transform: "rotate(180deg)" }}
      >
        {chevron_right}
      </button>
      <button className={`${styles.btn} ${nextClass}`}>{chevron_right}</button>
    </div>
  );
}
