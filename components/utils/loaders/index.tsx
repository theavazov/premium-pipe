import styles from "./loaders.module.css";

export function CategoriesLoader() {
  return (
    <div className="catgegories_container">
      <div className={`skeleton ${styles.category}`}></div>
    </div>
  );
}
