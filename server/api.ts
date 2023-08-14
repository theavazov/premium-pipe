import axios from "axios";
import { ICategory, INews } from "./interfaces";

export async function getCategories(locale: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/categories`,
    {
      headers: { Language: locale },
    }
  );

  const data = await res.data.results;

  return data;
}

export async function getSingleCategory(locale: string, slug: any) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/categories/${slug}`,
    {
      headers: { Language: locale },
    }
  );

  const data = await res.data;

  return data as ICategory;
}

export async function getPartners(locale: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/partners`, {
    headers: { Language: locale },
  });

  const data = await res.data.results;

  return data;
}

export async function getMedia(locale: string, variant: "video" | "image") {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/media?type=${variant}`,
    {
      headers: { Language: locale },
    }
  );

  const data = await res.data.results;

  return data;
}

export async function getProducts(locale: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/products`, {
    headers: { Language: locale },
  });

  const data = await res.data.results;

  return data;
}

export async function getSingleProduct(locale: string, slug: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/products/${slug}`,
    {
      headers: { Language: locale },
    }
  );

  const data = await res.data;

  return data;
}

export async function getNews(locale: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/news`, {
    headers: { Language: locale },
  });

  const data = await res.data.results;

  return data as INews[];
}

export async function getSingleNews(locale: string, slug: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/news/${slug}`,
    {
      headers: { Language: locale },
    }
  );

  const data = await res.data;

  return data;
}

export async function searchProducts(query: string) {}

export async function getSiteinfo(locale: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/static_infos`,
    {
      headers: { language: locale },
    }
  );

  const data = res.data;

  return data;
}
