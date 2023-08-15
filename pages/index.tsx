import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import dynamic from "next/dynamic";
import {
  getCategories,
  getMedia,
  getPartners,
  getProducts,
} from "../server/api";

// Interfaces
import { ICategory, IGallery, IPartner, IProduct } from "../server/interfaces";
import Toast from "../components/utils/toast";
import { useContext } from "react";
import { FormContext } from "../store/form";

// Sections
const Hero = dynamic(() => import("../components/home/hero"));
const About = dynamic(() => import("../components/home/about"));
const Categories = dynamic(() => import("../components/home/categories"));
const Products = dynamic(() => import("../components/home/products"));
const Gallery = dynamic(() => import("../components/home/gallery"));
const Partners = dynamic(() => import("../components/universal/partners"));
const Contacts = dynamic(() => import("../components/home/contact"));

interface PageProps {
  categories: ICategory[];
  partners: IPartner[];
  galleries: IGallery[];
  products: IProduct[];
}

export default function Page({
  categories,
  partners,
  galleries,
  products,
}: PageProps) {
  const { isSuccess } = useContext(FormContext);

  return (
    <>
      <CustomHead title={"Premium Pipe"} desc={""} canonical={"/"} />
      <Layout>
        <Hero />
        <About />
        <Categories categories={categories} />
        <Products products={products} />
        <Gallery galleries={galleries} />
        <Partners partners={partners} />
        <Contacts />
      </Layout>
      <Toast
        variant="success"
        toast={isSuccess ? true : false}
        message={"Muvaffaqiyatli yuborildi!"}
      />
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const categories = await getCategories(ctx.locale);
  const partners = await getPartners(ctx.locale);
  const galleries = await getMedia(ctx.locale, "image");
  const products = await getProducts(ctx.locale);

  return {
    props: { categories, partners, galleries, products },
  };
}
