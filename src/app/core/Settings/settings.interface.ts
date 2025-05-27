export interface ISettings{
  id: number;
  idTheme: number;
  themes: IThemeColors[];
  typography: string;
  idTypography: number;
  sizeTypography: string;
  valuesTypography: ITypography[];
}


export interface ITheme{
  id: number;
  nameTheme: string;
  colors: IThemeColors[];
}

interface IThemeColors{
  name: string;
  value: string;
}

export interface ITypography{
  id: number;
  nameTypo: string;
}
