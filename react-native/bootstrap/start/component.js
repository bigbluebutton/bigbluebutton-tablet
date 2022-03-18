import React from 'react';
import {Routes} from '../../app/routes/component';
import {PortalContextContainer} from '../../app/contexts/portals/container';

//This file is used to envolve app in contexts, libs, etc..
export const Bootstrap = () => {
  return (
    <PortalContextContainer>
      <Routes />
    </PortalContextContainer>
  );
};
