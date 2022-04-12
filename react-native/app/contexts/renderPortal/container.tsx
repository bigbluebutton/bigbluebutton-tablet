import React, { useReducer } from 'react';
import {RenderPortalContext} from './context';
import {IAction, IRenderPortals, IState} from './types';

export const RenderPortalContextContainer = ({children}: any) => {

  const renderPortalReducer = (state: IState, action: IAction)=>{
    switch(action.type){
      case 'InitValidation':
        return {
          ...state,
          hasPortalToValid: action.payload,
          clickNo: false
        }
      case 'ClickButtonYesAndSetFalse':
        return {
          ...state,
          clickYes: false
        }
      case 'ClickButtonNoAndSetFalse':
        return {
          ...state,
          clickNo: false
        }
      case 'ClickButtonNoModal':
        return {
          ...state,
          clickNo: true,
          hasPortalToValid: false,
          showAlert: false
        }
      case 'ClickButtonYesModal':
        return {
          ...state,
          clickYes: true,
          hasPortalToValid: false,
          showAlert: false
        }
      default: 
        return state
    }


  }

  const renderPortalInitialValue = {
    hasPortalToValid: false,
    clickNo: false,
    clickYes: false,
    showAlert: false
  }

  const [reducerWithStateOfValidationsOnChangePortal, setReducerWithStateOfValidationsOnChangePortal] = useReducer(renderPortalReducer, renderPortalInitialValue)


  if (reducerWithStateOfValidationsOnChangePortal.hasPortalToValid && typeof reducerWithStateOfValidationsOnChangePortal.hasPortalToValid !== 'undefined') {
    reducerWithStateOfValidationsOnChangePortal.showAlert = true;
  } else {
    reducerWithStateOfValidationsOnChangePortal.showAlert = false;
  }

  const validatePortalHook: IRenderPortals = {
    reducerWithStateOfValidationsOnChangePortal,
    setReducerWithStateOfValidationsOnChangePortal
  };
  return (
    <>
      <RenderPortalContext.Provider value={validatePortalHook}>
        {children}
      </RenderPortalContext.Provider>
    </>
  );
};
