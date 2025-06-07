import { Menu } from "./navigation.types"

export const MENU_DEFINED: Menu[] = [
  {
    title: "Home", 
    icon: "home", 
    submenu: false,
    path: "home"
  },
  {
    title: "Ventas",
     icon: "attach_money",
     path: "ventas",
    submenu: false,
  },
  {
    title: "Reportes",
    icon: "library_books",
    path: "reportes",
    submenu: true,
    submenuItems: [
      {
        title: "Resumen de Caja",
        icon: "subject",
        path: "resumenCaja"
      },
      {
        title: "Listado de Comprobantes",
        icon: "receipt",
        path: "listadoComprobantes"
      },
      {
        title: "Movmientos de Productos",
        icon: "store",
        path: "movProductos"
      },
      {
        title: "Movmientos de Caja",
        icon: "list_alt",
        path: "movCaja"
      }
    ]
  },
  {
    title: "Caja",
    icon: "storage",
    path: "formEgresoIngreso", 
    submenu: false
  },
  {
    title: "Análisis",
    icon: "assessment",
    path: "analiticas",
    submenu: false
  },
  {
    title: "Calendario",
    icon: "calendar_today",
    path: "calendario",
    submenu: false
  },
  {
    title: "Profile",
    icon: "account_circle",
    path: "perfil",
    submenu: false
  },
  {
    title: "Configuración",
    icon: "settings",
    path: "configuracion",
    submenu: false
  },
  {
    title: "Logout",
    icon: "exit_to_app",
    path: "logout",
    submenu: false
  }
]
