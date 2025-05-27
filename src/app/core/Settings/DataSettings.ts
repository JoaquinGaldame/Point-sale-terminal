import { ISettings, ITheme, ITypography } from "./settings.interface";
export const THEMES: ITheme [] =[
  {
    id: 1,
    nameTheme: "light",
    colors: [
      {
        name: "sidenav",
        value: "bg-blue-500"
      },
      {
        name: "headernav",
        value: "bg-blue-700"
      },
      {
        name: "background",
        value: "bg-gray-50"
      }
    ]
  },
  {
    id: 2,
    nameTheme: "dark",
    colors: [
      {
        name: "sidenav",
        value: "bg-stone-800"
      },
      {
        name: "headernav",
        value: "bg-slate-950"
      },
      {
        name: "background",
        value: "bg-gray-200"
      }
    ]
  }
]

export const TYPOGRAPHIES: ITypography[] = [
  {
    id: 1,
    nameTypo: "font-sans"
  },
  {
    id: 2,
    nameTypo: "font-serif"
  },
  {
    id: 3,
    nameTypo: "font-mono"
  },
  {
    id: 4,
    nameTypo: ""
  }
]


export const SETTINGS: ISettings = {
  id: 1,
  idTheme: 1,
  themes: [
    {
      name: "primary",
      value: "blue"
    },
    {
      name: "dark",
      value: "gray"
    },
    {
      name: "light",
      value: "slate"
    }
  ],
  typography: "",
  idTypography: 0,
  sizeTypography: "",
  valuesTypography: TYPOGRAPHIES
}

