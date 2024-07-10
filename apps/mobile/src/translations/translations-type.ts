export type Language = 'fr'

export type Translations = Record<
  Language,
  {
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
      start: string
    }
  }
>
