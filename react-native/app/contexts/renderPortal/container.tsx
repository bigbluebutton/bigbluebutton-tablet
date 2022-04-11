import React, { useReducer } from 'react';
import {RenderPortalContext} from './context';
import {IAction, IRenderPortals, IState} from './types';

export const RenderPortalContextContainer = ({children}: any) => {

  const renderPortalReducer = (state: IState, action: IAction)=>{
    switch(action.type){
      case 'InitValidateModal':
        return {
          ...state,
          validatePortal: action.payload,
          clickNo: false
        }
      case 'ClickYesFalse':
        return {
          ...state,
          clickYes: false
        }
      case 'ClickNoFalse':
        return {
          ...state,
          clickNo: false
        }
      case 'ClickNoModal':
        return {
          ...state,
          clickNo: true,
          validatePortal: false,
          showAlert: false
        }
      case 'ClickYesModal':
        return {
          ...state,
          clickYes: true,
          validatePortal: false,
          showAlert: false
        }
      default: 
        return state
    }


  }

  const renderPortalInitialValue = {
    validatePortal: false,
    clickNo: false,
    clickYes: false,
    showAlert: false
  }

  const [renderPortal, setRenderPortal] = useReducer(renderPortalReducer, renderPortalInitialValue)


  if (renderPortal.validatePortal && typeof renderPortal.validatePortal !== 'undefined') {
    renderPortal.showAlert = true;
  } else {
    renderPortal.showAlert = false;
  }

  const validatePortalHook: IRenderPortals = {
    renderPortal,
    setRenderPortal
  };
  return (
    <>
      <RenderPortalContext.Provider value={validatePortalHook}>
        {children}
      </RenderPortalContext.Provider>
    </>
  );
};
