import Image from "next/image";
import { IGallery } from "../../../server/interfaces";
import styles from "./gallery.module.css";

export default function GalleryCard({ gallery }: { gallery: IGallery }) {
  return (
    <div className={styles.card}>
      <div className={styles.card_image}>
        <Image
          src={gallery.image}
          alt="gallery"
          className="image"
          width={400}
          height={250}
        />
      </div>
    </div>
  );
}
