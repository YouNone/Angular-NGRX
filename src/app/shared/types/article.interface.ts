import { ProfileInterface } from './profile.interface';

export interface ArticleInterface {
  author: ProfileInterface;
  createdAt: string;
  body: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string;
  title: string;
  updatedAt: string;
}
