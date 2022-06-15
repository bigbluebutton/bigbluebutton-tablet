export type IPortal = {
  name: string;
  url: string;
  temporary: boolean
};

export type IPortalToAdd = {
  portals: Array<IPortal>;
  name: string;
  url: string;
  temporary: boolean;
};

export type IPortalProp = string | null | IPortal[];
