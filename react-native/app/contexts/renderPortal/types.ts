import { Dispatch } from "react";

export type IRenderPortals = {
  renderPortal: IState,
  setRenderPortal: Dispatch<IAction>
};


export type IValidatePortal = {
  name: string;
  itemNavigate: object;
}
export type IState = {
  validatePortal: boolean | IValidatePortal,
  clickNo: boolean,
  clickYes: boolean,
  showAlert: boolean
}

export type IAction = {
  type: string;
  payload?: any;
}