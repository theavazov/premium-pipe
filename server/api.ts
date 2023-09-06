import axios from "axios";
import { ICategory, INews, IStoreObjectData } from "./interfaces";

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

export async function getNews(locale: string, page: number) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/news/?page=${page}`,
    {
      headers: { Language: locale },
    }
  );

  const data = await res.data;

  return data;
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

export async function searchProducts(query: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/products?search=${query}`
  );

  const data = res.data;

  return data;
}

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

export async function storeOrders(data: IStoreObjectData) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/application/create`,
    data
  );

  return res.data;
}
