import { HomeScreen } from '../../screens/home/home'
import { SessionAutoScreen } from '../../screens/session-auto/session-auto'

export const pages = {
  home: HomeScreen,
  sessionAuto: SessionAutoScreen,
}

export type PagesList = {
  [pageName in keyof typeof pages]: Parameters<typeof pages[pageName]>[0]
}
