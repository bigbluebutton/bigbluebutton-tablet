import React from 'react';
import {RenderPortalContext} from './context';
import {IRenderPortals} from './types';

export const RenderPortalContextContainer = ({children}: any) => {
  const [validatePortal, setValidatePortal] = React.useState(false);
  const [portalWantBeRenderized, setPortalWantBeRenderized] =
    React.useState(false);
  const [portalDisfocused, setPortalDisfocused] = React.useState(false);
  const clickNo = React.useRef(false);
  const clickYes = React.useRef(false);
  const showAlert = React.useRef(false);
  if (validatePortal && typeof validatePortal !== 'undefined') {
    showAlert.current = true;
  } else {
    showAlert.current = false;
  }

  const validatePortalHook: IRenderPortals = {
    validatePortal,
    setValidatePortal,
    portalWantBeRenderized,
    setPortalWantBeRenderized,
    portalDisfocused,
    setPortalDisfocused,
    clickYes,
    clickNo,
    showAlert,
  };
  return (
    <>
      <RenderPortalContext.Provider value={validatePortalHook}>
        {children}
      </RenderPortalContext.Provider>
    </>
  );
};
