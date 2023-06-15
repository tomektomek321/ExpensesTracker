import { AuthRegister } from "../../components/modal/auth/SignUp";

export class AuthGateway {

  private static readonly apiUrl = "http://localhost:5139/api/user/";

  public static async register(data: AuthRegister) {
  debugger
  const d = JSON.stringify(data);
  console.log(d);
    const response = await fetch(this.apiUrl + "register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: d,
    });

    if(response) {
      console.log(1)
    } else {
      console.log(2)
    }

    const a = response.json();

    return a;



  }














}