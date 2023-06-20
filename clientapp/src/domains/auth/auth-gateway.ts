import { AuthLoginPayload } from "../../components/modal/auth/Login";
import { AuthRegister } from "../../components/modal/auth/SignUp";
import { environment } from "../../environment/environment";

export interface AuthLoginResponse extends Response {
  token: string;
}

export interface authData {
  username: string;
  token: string;
}

export class AuthGateway {

  private static readonly apiUrl = environment.apiUrl;
  private static readonly userStorage = 'expenseUser';

  public static register(data: AuthRegister) {

    return new Promise((res, rej) => {
      fetch(this.apiUrl + "user/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(resp => {
        res(resp)
      }).catch(e => { 
        console.log(e);
        rej(e);
      });
    });
  }

  public static login(data: AuthLoginPayload): Promise<AuthLoginResponse> {
    return new Promise((res, rej) => {
      fetch(this.apiUrl + "user/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(d => d.json())
      .then((response: AuthLoginResponse) => {
        this.persistLoginUser(data.Username, response.token);
        return response;
      })
      .then((response: any) => {
        res(response as unknown as AuthLoginResponse)
      })
      .catch(e => { 
        console.log(e);
        rej(e);
      });
    })
  }

  private static persistLoginUser(username: string, token: string): Promise<boolean> {
    return new Promise(async (res, rej) => {
      try {    
  
        const user = JSON.stringify({username, token});
        await localStorage.setItem(this.userStorage, user);
        res(true)
  
      } catch(e) {
        console.log("persistLoginUser error");
        rej(false);
      }
    });
  }

  public static getPersistedUser(): Promise<authData | false> {
    return new Promise(async (res, rej) => {
      try {
        let usersDbString = await localStorage.getItem(this.userStorage);
        if(usersDbString) {
          const user = JSON.parse(usersDbString);
          res({
            username: user.username,
            token: user.token,
          })
        } else {
          rej(false);
        }
      } catch(e) {
        console.log("getPersistedUser error");
        rej(false);
      }
    });
  }



  public static logOut(): Promise<number> {
    return new Promise((res, rej) => {
      res(1);
      localStorage.removeItem(this.userStorage);
    });
  }
}
