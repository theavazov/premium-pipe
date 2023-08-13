export interface ICategory {
  id: number;
  slug: string;
  title: string;
  image: string | null;
}

export interface IPartner {
  id: number;
  image: string | null;
  name: string;
}

export interface IGallery {
  id: number;
  image: string;
  link: string | null;
}

export interface IProduct {
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string | null;
  category: string;
  details: string | null;
  desc: string;
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
