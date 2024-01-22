/* tslint:disable */
/* eslint-disable */
import { Recipe } from '../models/recipe';
export interface PaginatedRecipeList {
  count?: number;
  next?: null | string;
  previous?: null | string;
  results?: Array<Recipe>;
}
