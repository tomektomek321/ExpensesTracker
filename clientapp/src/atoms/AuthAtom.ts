import { atom } from "recoil";

interface AuthState {
  logged: boolean;
  token: string | null;
  displayName: string | null;
  email: string | null;
}

const defaultAuthState: AuthState = {
  logged: false,
  token: null,
  displayName: null,
  email: null,
};

export const authState = atom<AuthState>({
  key: "authState",
  default: defaultAuthState,
});