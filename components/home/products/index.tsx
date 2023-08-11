import Link from "next/link";
import { arrow_right } from "../../../public/icons";
import styles from "./products.module.css";
import { IProduct } from "../../../server/interfaces";
import ProductCard from "../../cards/product";

export default function ProductsSection({
  products,
}: {
  products: IProduct[];
}) {
  return (
    <section className="section">
      <div className="box section_inner">
        <div className="section_inner_top">
          <h3 className="section_title">Популярные продукты</h3>
          {/* <Link href={"/categories"}>Узнать больше {arrow_right}</Link> */}
        </div>
        <div className="products_container">
          {products.length > 0
            ? products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })
            : null}
        </div>
      </div>
    </section>
  );
}
