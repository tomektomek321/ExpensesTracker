import { atom } from "recoil";

interface AuthState {
  logged: boolean;
  token: string | null;
  displayName: string | null;
}

const defaultAuthState: AuthState = {
  logged: false,
  token: null,
  displayName: null,
};

export const authState = atom<AuthState>({
  key: "authState",
  default: defaultAuthState,
});