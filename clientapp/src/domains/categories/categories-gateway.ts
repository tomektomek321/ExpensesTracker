import { environment } from "../../environment/environment";
import { ICategory } from "../models/ICategory";

export class CategoryGateway {
  private static readonly apiUrl = environment.apiUrl;
  
  public static async getCategories(): Promise<ICategory[]> {
    return new Promise((res, rej) => {
      fetch(this.apiUrl + `categories`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(d => d.json())
      .then((resp: ICategory[]) => {
        res(resp);
      }).catch(e => { 
        console.log(e);
        rej(e);
      });
    });
  }
}
