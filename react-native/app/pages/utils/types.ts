export type ICreatePortal = {
  name: string;
  url: string;
};

export type IPortal = {
  name: string;
  url: string;
};

export type IPortalToAdd = {
  portals: Array<IPortal>;
  name: string;
  url: string;
};

export type IPortalProp = string | null | IPortal[];
