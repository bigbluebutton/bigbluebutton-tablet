import React from 'react';
import {Routes} from '../../app/routes/component';
import {PortalContextContainer} from '../../app/contexts/portals/container';
import {RenderPortalContextContainer} from '../../app/contexts/renderPortal/container';

//This file is used to envolve app in contexts, libs, etc..
export const Bootstrap = () => {
  return (
    <PortalContextContainer>
      <RenderPortalContextContainer>
        <Routes />
      </RenderPortalContextContainer>
    </PortalContextContainer>
  );
};
