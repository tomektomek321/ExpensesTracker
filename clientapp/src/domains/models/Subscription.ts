export interface ISubscription {
  id: string;
  name: string;
  amount: number;
  renewalDate: Date;
  userId?: string;
}

export class Subscription {
  public readonly id: string;
  public readonly name: string;
  public readonly amount: number;
  public readonly renewalDate: Date;

  constructor(data: ISubscription) {
    this.id = data.id;
    this.name = data.name;
    this.amount = data.amount;
    this.renewalDate = data.renewalDate;
  }
}
