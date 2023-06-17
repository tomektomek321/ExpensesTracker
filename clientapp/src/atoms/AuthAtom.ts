import { atom } from "recoil";

export interface AuthRecoilState {
  logged: boolean;
  token: string | null;
  username: string | null;
}

const defaultAuthState: AuthRecoilState = {
  logged: false,
  token: null,
  username: null,
};

export const authState = atom<AuthRecoilState>({
  key: "authState",
  default: defaultAuthState,
});