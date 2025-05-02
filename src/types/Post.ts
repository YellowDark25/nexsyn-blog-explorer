
export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  category: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    name: string;
  };
}
