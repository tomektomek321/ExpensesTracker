import { atom } from "recoil";
import { ViewType } from "../domains/enums/ViewType";

interface AppState {
  viewType: ViewType;
  date: Date;
}

const defaultAppState: AppState = {
  viewType: ViewType.Day,
  date: new Date(),
};

export const appState = atom<AppState>({
  key: "appState",
  default: defaultAppState,
});
