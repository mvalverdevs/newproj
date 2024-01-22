/* tslint:disable */
/* eslint-disable */
import { RecipeIngredient } from '../models/recipe-ingredient';
export interface PaginatedRecipeIngredientList {
  count?: number;
  next?: null | string;
  previous?: null | string;
  results?: Array<RecipeIngredient>;
}
