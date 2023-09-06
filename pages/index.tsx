import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import dynamic from "next/dynamic";
import {
  getCategories,
  getMedia,
  getNews,
  getPartners,
  getProducts,
} from "../server/api";

// Interfaces
import {
  ICategory,
  IGallery,
  INews,
  IPartner,
  IProduct,
} from "../server/interfaces";
import Toast from "../components/utils/toast";
import { useContext } from "react";
import { FormContext } from "../store/form";
import { TranslationsContext } from "../store/translations";

// Sections
const Hero = dynamic(() => import("../components/home/hero"));
const About = dynamic(() => import("../components/home/about"));
const Categories = dynamic(() => import("../components/home/categories"));
const Products = dynamic(() => import("../components/home/products"));
const News = dynamic(() => import("../components/home/news"));
const Partners = dynamic(() => import("../components/universal/partners"));
const Contacts = dynamic(() => import("../components/home/contact"));

interface PageProps {
  categories: ICategory[];
  partners: IPartner[];
  news: INews[];
  products: IProduct[];
}

export default function Page({
  categories,
  partners,
  news,
  products,
}: PageProps) {
  const { isSuccess } = useContext(FormContext);
  const { t } = useContext(TranslationsContext);

  return (
    <>
      <CustomHead title={"Premium Pipe"} desc={""} canonical={"/"} />
      <Layout categories={categories}>
        <Hero />
        <About />
        <Categories categories={categories} />
        <Products products={products} />
        <News news={news} />
        <Partners partners={partners} />
        <Contacts />
      </Layout>
      <Toast
        variant="success"
        toast={isSuccess ? true : false}
        message={`${t["main.successfully_sent"]}!`}
      />
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const categories = await getCategories(ctx.locale);
  const partners = await getPartners(ctx.locale);
  const news = await getNews(ctx.locale, 1);
  const products = await getProducts(ctx.locale);

  return {
    props: { categories, partners, news: news.results, products },
  };
}
