export interface BlogPostOutput {
  id: string;
  accepted?: boolean;
  urls: string[];
  description: string;
  comment: string;
  products: ProductNameAndImage[];
  created: Date;
}

interface ProductNameAndImage {
  name: string;
  image: string;
}
