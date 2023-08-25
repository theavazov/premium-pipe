import Image from "next/image";
import { IGallery } from "../../../server/interfaces";
import styles from "./gallery.module.css";
import { useContext } from "react";
import { ModalContext } from "../../../store/modal";

export default function GalleryCard({ gallery }: { gallery: IGallery }) {
  const { setIsModal, setMedia, setVariant, setZoomImage } =
    useContext(ModalContext);

  return (
    <div>
      {gallery.image && gallery.image ? (
        <div
          className={styles.card}
          onClick={() => {
            setVariant("image");
            setZoomImage(gallery.image);
            setMedia(gallery);
            setIsModal(true);
          }}
        >
          <div className={styles.card_image}>
            <Image
              src={gallery.image}
              alt="gallery"
              className="image"
              width={400}
              height={250}
            />
          </div>
          <div className={styles.card_hover_img}>
            <Image
              src="/media/gallery_hover_img.png"
              alt="gallery"
              className="image"
              width={400}
              height={250}
            />
          </div>
        </div>
      ) : (
        <div
          className={styles.card}
          onClick={() => {
            setVariant("video");
            setZoomImage(gallery.video);
            setMedia(gallery);
            setIsModal(true);
          }}
        >
          <div className={styles.card_image}>
            <video src={gallery.video}></video>
          </div>
          <div className={styles.card_hover_img}>
            <Image
              src="/media/gallery_hover_img.png"
              alt="gallery"
              className="image"
              width={400}
              height={250}
            />
          </div>
        </div>
      )}
    </div>
  );
}
