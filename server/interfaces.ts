export interface IStorageOrder {
  id: number;
  title: string;
  image: string | null;
  count: number;
}

export interface ICategory {
  id: number;
  slug: string;
  title: string;
  image: string | null;
  desc: string | null;
  products: IProduct[];
}

export interface IPartner {
  id: number;
  image: string | null;
  name: string;
}

export interface IGallery {
  id: number;
  video: string;
  image: string;
  link: string | null;
}

export interface IProduct {
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string | null;
  category: ICategory;
  details: string | null;
  desc: string;
  images: { id: number; image: string }[];
}

export interface INews {
  id: number;
  image: string | null;
  slug: string;
  title: string;
  date: string;
  subtitle: string;
  views: number;
  desc: string;
}

export interface IMedia {
  id: number;
  image: string | null;
  video: string | null;
}

export interface IObjectOrder {
  id: number;
  count: number;
}

export interface IStoreObjectData {
  name: string;
  number: string;
  message: string;
  email: string;
  products: IObjectOrder[];
}
export interface IStore {
  name: string;
  number: string;
}
