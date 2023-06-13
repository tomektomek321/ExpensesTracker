import { ICategory } from "../models/ICategory";

export default function GetCategoriesByUserId(id: string): Promise<ICategory[]> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([
        {id: "123asd123123s", name: "Spożywka", userId: "addd1", },
        {id: "1234sddsfsdf33", name: "Rozrywka", userId: "addd1", },
        {id: "123a1ddsfsj", name: "Sport", userId: "addd1", },
        {id: "123a1dg", name: "Restauracje", userId: "addd1", },
      ]);
    }, 500);
  })
}
