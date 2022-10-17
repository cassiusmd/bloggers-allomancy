import { BlogApplicationAnswerDto } from './BlogApplicationAnswerDto';

export interface BlogApplicationViewDto {
  id: string;
  info: string;
  answers: BlogApplicationAnswerDto[];
  accepted?: boolean;
  created: Date;

  storeName: string;
  storeLogo: string;
}
