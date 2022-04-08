import {useContext} from 'react';
import {RenderPortalContext} from './context';
import {IRenderPortals} from './types';

export const useRenderPortal = () => {
  const context = useContext(RenderPortalContext);
  return context as IRenderPortals;
};
