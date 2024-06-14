export type Language = 'en' | 'es' | 'fr'

export type Translations = Record<
  Language,
  {
    home: {
      button: string
      description: string
      title: string
    }
  }
>
