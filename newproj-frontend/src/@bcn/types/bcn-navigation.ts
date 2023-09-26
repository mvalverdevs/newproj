
export interface BCNNavigationItem {
  id: string;
  title: string;
  type: 'item' | 'group' | 'collapse';
  icon?: string;
  svg?: boolean;
  hidden?: boolean;
  url?: string;
  exactMatch?: boolean;
  externalUrl?: boolean;
  openInNewTab?: boolean;
  function?: any;
  color?: string,
  badge?: {
    title?: string;
    bg?: string;
    fg?: string;
  };
  children?: BCNNavigationItem[];
  formService?: Object;
}

export interface BCNNavigation extends BCNNavigationItem {
  children?: BCNNavigationItem[];
}
