import { HomeScreen } from '../../screens/home/home'

export const pages = {
  home: HomeScreen,
}

export type PagesList = {
  [pageName in keyof typeof pages]: Parameters<typeof pages[pageName]>[0]
}
