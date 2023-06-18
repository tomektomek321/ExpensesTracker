import { atom } from "recoil";
import { ICategory } from "../domains/models/ICategory";

interface CategoriesState {
  categories: ICategory[];
}

const defaultCategoriesState: CategoriesState = {
  categories: []
};

export const categoriesState = atom<CategoriesState>({
  key: "categoriesState",
  default: defaultCategoriesState,
});
