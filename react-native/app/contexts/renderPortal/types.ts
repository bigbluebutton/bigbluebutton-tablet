import { Dispatch } from "react";

export type IRenderPortals = {
  reducerWithStateOfValidationsOnChangePortal: IState,
  setReducerWithStateOfValidationsOnChangePortal: Dispatch<IAction>
};


export type IValidatePortal = {
  name: string;
  itemNavigate: object;
}
export type IState = {
  hasPortalToValid: boolean | IValidatePortal,
  clickNo: boolean,
  clickYes: boolean,
  showAlert: boolean
}

export type IAction = {
  type: string;
  payload?: any;
}