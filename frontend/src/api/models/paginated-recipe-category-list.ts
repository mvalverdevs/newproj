/* tslint:disable */
/* eslint-disable */
import { RecipeCategory } from '../models/recipe-category';
export interface PaginatedRecipeCategoryList {
  count?: number;
  next?: null | string;
  previous?: null | string;
  results?: Array<RecipeCategory>;
}
