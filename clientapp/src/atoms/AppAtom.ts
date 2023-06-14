import { atom } from "recoil";
import { ViewType } from "../domains/enums/ViewType";

interface AppState {
  viewType: ViewType;
  viewModal: {
    view: "login" | "signup" | "reset",
    open: boolean;
  }
  date: Date;
}

const defaultAppState: AppState = {
  viewType: ViewType.Day,
  viewModal: {
    view: "login",
    open: false,
  },
  date: new Date(),
};

export const appState = atom<AppState>({
  key: "appState",
  default: defaultAppState,
});
