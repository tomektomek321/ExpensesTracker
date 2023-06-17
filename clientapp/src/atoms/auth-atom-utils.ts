import { AuthRecoilState } from "./AuthAtom";

export function RecoilSignIn(setAuthRecoil: any, username: string, token: string) {
  setAuthRecoil((prev: AuthRecoilState) => {
    return {
      ...prev,
      username,
      token: token,
      logged: true,
    }
  });
}

export function RecoilSignOut(setAuthRecoil: any) {
  setAuthRecoil((prev: AuthRecoilState) => {
    return {
      ...prev,
      username: null,
      token: null,
      logged: false,
    }
  });
}
