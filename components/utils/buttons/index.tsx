import { chevron_right, hugearrow } from "../../../public/icons";
import styles from "./buttons.module.css";

interface ComponentProps {
  variant: "chevron" | "arrow";
  prevClass: string;
  nextClass: string;
}

export default function Buttons({
  variant,
  prevClass,
  nextClass,
}: ComponentProps) {
  return (
    <div className={styles.buttons}>
      {variant === "chevron" ? (
        <>
          <button
            className={`${styles.btn} ${prevClass}`}
            style={{ transform: "rotate(180deg)" }}
          >
            {chevron_right}
          </button>
          <button className={`${styles.btn} ${nextClass}`}>
            {chevron_right}
          </button>
        </>
      ) : variant === "arrow" ? (
        <>
          <button
            className={`${styles.arrowbtn} ${prevClass}`}
            style={{ transform: "rotate(180deg)" }}
          >
            {hugearrow}
          </button>
          <button className={`${styles.arrowbtn} ${nextClass}`}>
            {hugearrow}
          </button>
        </>
      ) : null}
    </div>
  );
}
