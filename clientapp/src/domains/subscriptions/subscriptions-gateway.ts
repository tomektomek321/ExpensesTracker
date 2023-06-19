import { environment } from "../../environment/environment";
import { AuthGateway } from "../auth/auth-gateway";
import { ISubscriptionPayload, ISubscriptionResponse } from "../models/ISubscriptionPayload";

export class SubscriptionGateway {

  private static readonly apiUrl = environment.apiUrl;

  public static async addSubscription(subscription: ISubscriptionPayload): Promise<ISubscriptionResponse> {
    const token: any = await AuthGateway.getPersistedUser();

    return new Promise((res, rej) => {
      fetch(this.apiUrl + "subscriptions", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        },
        body: JSON.stringify(subscription),
      })
      .then(x => x.json())
      .then((resp: ISubscriptionResponse) => {
        !!resp && res(resp);
      }).catch(e => { 
        console.log(e);
        rej(e);
      });
    });
  }

  public static async getSubscriptions(): Promise<ISubscriptionResponse[]> {
    const token: any = await AuthGateway.getPersistedUser();

    return new Promise((res, rej) => {
      fetch(this.apiUrl + "subscriptions", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        },
      })
      .then(x => x.json())
      .then((resp: ISubscriptionResponse[]) => {
        !!resp && res(resp);
      }).catch(e => { 
        console.log(e);
        rej(e);
      });
    });
  }





}