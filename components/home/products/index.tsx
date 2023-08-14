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
        </div>
        <div className="products_container">
          {products.length > 0
            ? products.slice(0, 8).map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })
            : null}
        </div>
      </div>
    </section>
  );
}
