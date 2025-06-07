export interface Navigation {
  navigation: Menu[];
}

export interface Menu {
  title: string;
  icon: string;
  submenu?: boolean;
  submenuItems?: itemMenu[];
  path: string;
}

interface itemMenu{
  title: string;
  icon: string;
  path: string;
}