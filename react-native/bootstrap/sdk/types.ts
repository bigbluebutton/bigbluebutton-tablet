import {DrawerScreenProps} from '@react-navigation/drawer';
import {ParamListBase} from '@react-navigation/native';
export type ISdkContainer = {
  url: string;
  props?: any;
  itemNavigate?: DrawerScreenProps<ParamListBase>;
  name?: string;
};
