export interface ISubscriptionPayload {
  name: string;
  amount: number;
  renewalDate: Date;
}

export interface ISubscriptionResponse {
  id: string;
  name: string;
  amount: number;
  renewalDate: Date;
  userId?: string;
}
