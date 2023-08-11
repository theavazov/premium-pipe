import axios from "axios";

export async function getCategories(locale: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/categories`,
      {
        headers: { language: locale },
      }
    );

    const data = await res.data.results;

    return data;
  } catch (error) {
    return error;
  }
}

export async function getPartners(locale: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/partners`,
      {
        headers: { language: locale },
      }
    );

    const data = await res.data.results;

    return data;
  } catch (error) {
    return error;
  }
}

export async function getMedia(locale: string, variant: "video" | "image") {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/media?type${variant}`,
      {
        headers: { language: locale },
      }
    );

    const data = await res.data.results;

    return data;
  } catch (error) {
    return error;
  }
}

export async function getProducts(locale: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/products`,
      {
        headers: { language: locale },
      }
    );

    const data = await res.data.results;

    return data;
  } catch (error) {
    return error;
  }
}
