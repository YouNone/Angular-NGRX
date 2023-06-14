import { PopularTagType } from 'src/app/shared/types/PopularTag.type';

export interface PopularTagsStateInterface {
  data: PopularTagType[];
  error: string | null;
  isLoading: boolean;
}
