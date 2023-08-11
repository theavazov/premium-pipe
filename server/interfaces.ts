export interface ICategory {
  id: number;
  slug: string;
  title: string;
  image: string | null;
  active: boolean;
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
}
