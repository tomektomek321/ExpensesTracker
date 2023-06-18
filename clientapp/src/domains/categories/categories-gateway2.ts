import { ICategory } from "../models/ICategory";

export default function GetCategoriesByUserId(id: string): Promise<ICategory[]> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([
        {id: "123asd123123s", name: "Spożywka" },
        {id: "1234sddsfsdf33", name: "Rozrywka" },
        {id: "123a1ddsfsj", name: "Sport" },
        {id: "123a1dg", name: "Restauracje" },
      ]);
    }, 500);
  })
}
