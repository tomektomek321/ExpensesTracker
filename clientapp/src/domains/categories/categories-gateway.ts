import { Category } from "../models/Category";

export default function GetCategoriesByUserId(id: string): Promise<Category[]> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([
        {id: "123asd", name: "Spożywka", userId: "addd1", },
        {id: "1234sd", name: "Rozrywka", userId: "addd1", },
        {id: "123a1d", name: "Sport", userId: "addd1", },
      ]);
    }, 500);
  })
}
