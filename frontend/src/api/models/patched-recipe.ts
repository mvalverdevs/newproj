/* tslint:disable */
/* eslint-disable */

/**
 * A ModelSerializer that takes additional arguments for
 * "fields" and "include" in order to
 * control which fields are displayed, and whether to replace simple values with
 * complex, nested serializations.
 */
export interface PatchedRecipe {
  category?: Array<number>;
  description?: string;
  diners?: number;
  id?: number;
  image?: null | string;
  ingredients?: Array<number>;
  name?: string;
  time?: number;
}
