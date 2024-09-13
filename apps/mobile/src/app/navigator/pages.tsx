import { AuthenticationScreen } from '../../screens/authentication/authentication'
import { HomeScreen } from '../../screens/home/home'
import { SessionAutoScreen } from '../../screens/session-auto/session-auto'
import { SessionManualScreen } from '../../screens/session-manual/session-manual'

export const pages = {
  authentication: AuthenticationScreen,
  home: HomeScreen,
  sessionAuto: SessionAutoScreen,
  sessionManual: SessionManualScreen,
}

export type PagesList = {
  [pageName in keyof typeof pages]: Parameters<typeof pages[pageName]>[0]
}
