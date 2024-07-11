export type Language = 'fr'

export type Translations = Record<
  Language,
  {
    authentication: {
      logIn: {
        title: string
      }
      oauth: {
        logInWithApple: string
        logInWithGoogle: string
      }
      signUp: {
        confirmPassword: string
        title: string
      }
    }
    introductionPopup: {
      text: string
      title: string
    }
    joinCard: {
      scanQRCode: string
      title: string
      welcomeText: string
    }
    misc: {
      close: string
      email: string
      firstName: string
      logIn: string
      password: string
      signUp: string
      start: string
    }
  }
>
