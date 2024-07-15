import * as React from 'react'
import { Button, Icon, Input } from 'ui'

import pciture from '../../../../public/picture-login.png'
import { useSignInForm } from '../hooks/use-sign-in'
/**
 *  Login screen for the user to sign in.
 */
export function SignInForm() {
  const {
    emailError,
    handleSubmit,
    passwordError,
    setFormValue,
    showPassword,
    signError,
  } = useSignInForm()

  const handlePasswordVisibilityToggle
    = (event: { preventDefault: () => void }) => {
      event.preventDefault()
      setFormValue('showPassword', !showPassword)
    }

  return (
    <div className="flex bg-gray-200 justify-center items-center h-full">
      <div className="flex bg-white p-10 rounded-md gap-10">
        <img alt="Logo" className="max-w-md rounded-md" src={pciture} />
        <div className="grid gap-4">
          <div className="grids-cols-6 flex flex-col justify-center">
            <h1 className="text-3xl font-bold">
              Bienvenue sur
              <span className="text-orange"> Yvees</span>
            </h1>
            <p className="font-medium">
              Gestion des données et des yvees dans votre musée..
            </p>
          </div>
          <form className="items-center grids-cols-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <Input
                error={emailError || signError}
                onChangeText={text => setFormValue('emailAddress', text)}
                placeholder="E-mail..."
                variant="outlined"
              />
              <Input
                action={{
                  icon: showPassword ? Icon.EyeOff : Icon.Eye,
                  onClick: handlePasswordVisibilityToggle,
                }}
                error={passwordError || signError}
                onChangeText={text => setFormValue('password', text)}
                placeholder="Mot de passe..."
                secureTextEntry={showPassword}
                variant="outlined"
              />
            </div>
            <div className="flex justify-center mt-4 max-h-10 ">
              <Button onClick={() => 'sumbit'} variant="primary">
                Connexion
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
