export interface Action<T, k> {
  type: T;
  payload: k;
}

export enum ChatActions {
  SET_SELECTED_CHAT = "setSelectedChatID",
  RESET_STATE = "resetState",
}
