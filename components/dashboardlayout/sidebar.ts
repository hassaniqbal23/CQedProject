export type IconType = React.ElementType;

export type IIcons = {
  Icon: IconType;
  title: string;
  submodules?: {
    Icon: IconType;
    title: string;
    path: string;
    permissions: boolean;
  }[];
  path?: string;
  permissions?: boolean;
};
