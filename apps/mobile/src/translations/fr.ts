import type { Translations } from './translations-type'

export const frTranslations: Translations['fr'] = {
  authentication: {
    logIn: {
      title: 'Connectez-vous',
    },
    oauth: {
      logInWithApple: 'Connectez-vous avec Apple',
      logInWithGoogle: 'Connectez-vous avec Google',
    },
    signUp: {
      confirmPassword: 'Confirmez le mot de passe',
      title: 'Inscrivez-vous',
    },
  },
  introductionPopup: {
    text: 'Yvees est votre guide personnel pour cette visite ! Pilotez-le, trouvez les QR Codes situés en-dessous des oeuvres du musée, et scannez-les avec la caméra de votre Yvees. Des informations complémentaires apparaîtront sur votre téléphone.',
    title: 'Pilotez votre Yvees',
  },
  joinCard: {
    scanQRCode: 'Scannez le QR code',
    title: 'Rejoignez une session',
    welcomeText: 'Vous vous apprêtez à visiter un musée ? Demandez à l’accueil si ils prennent en charge les Yvees afin de rendre votre visite plus attractive !',
  },
  misc: {
    close: 'Fermer',
    email: 'Email',
    firstName: 'Prénom',
    logIn: 'Se connecter',
    password: 'Mot de passe',
    signUp: 'S\'inscrire',
    start: 'Démarrer',
  },
}
