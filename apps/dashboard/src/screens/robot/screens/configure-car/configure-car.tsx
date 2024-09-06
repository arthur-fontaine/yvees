import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from 'ui'
import { z } from 'zod'

import { useBootCar } from './hooks/use-boot-car'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../../shared/components/ui/form'
import { router } from '../../../../utils/router'

const configureCarFormSchema = z.object({
  gatewayIp: z.string().regex(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, {
    message: 'L\'adresse IP doit être au format x.x.x.x',
  }),
  mqttIp: z.string().regex(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, {
    message: 'L\'adresse IP doit être au format x.x.x.x',
  }),
  subnet: z.string().regex(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, {
    message: 'Le masque de sous-réseau doit être au format x.x.x.x',
  }),
  wifiPassword: z.string(),
  wifiSsid: z.string().min(1, {
    message: 'Le SSID doit comporter au moins un caractère',
  }),
})

const CONFIGURE_CAR_FORM_KEY = 'configureCarForm'

/**
 * The configure car screen.
 */
export function ConfigureCar() {
  const { bootCar, loading } = useBootCar()
  const configureCarForm = useForm<z.infer<typeof configureCarFormSchema>>({
    async defaultValues() {
      const storedValues = localStorage.getItem(CONFIGURE_CAR_FORM_KEY)
      if (storedValues) {
        return JSON.parse(storedValues)
      }
      return {}
    },
    resolver: zodResolver(configureCarFormSchema),
  })

  // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
  const onSubmit = useCallback(() => {
    localStorage.setItem(
      CONFIGURE_CAR_FORM_KEY,
      JSON.stringify(configureCarForm.getValues()),
    )
    bootCar(configureCarForm.getValues())
  }, [bootCar, configureCarForm])

  return (
      <div className="h-screen p-10 mb-10">
          <h1 className="text-3xl font-bold my-8">Configurer la voiture :</h1>
          <div>
              <p className="text-sm text-muted-foreground max-w-3xl">
                  BLABLA
              </p>
          </div>
          <h2 className="text-xl mt-8">Remplissez les différents champs :</h2>
          <Form {...configureCarForm}>
              <form
                className="w-2/3 space-y-6 my-4"
                onSubmit={configureCarForm.handleSubmit(onSubmit)}
              >
                  <FormField
                    control={configureCarForm.control}
                    name="wifiSsid"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SSID du wifi :</FormLabel>
                            <FormControl>
                                <Input
                                  inputMd
                                  onChangeText={field.onChange}
                                  placeholder="SSID du wifi.."
                                  value={field.value}
                                  variant="outlined"
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                Le SSID du wifi est le nom de votre réseau wifi.
                            </FormDescription>
                        </FormItem>
            )}
                  />

                  <FormField
                    control={configureCarForm.control}
                    name="wifiPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe du wifi :</FormLabel>
                            <FormControl>
                                <Input
                                  inputMd
                                  onChangeText={field.onChange}
                                  placeholder="Mot de passe du wifi.."
                                  secureTextEntry
                                  value={field.value}
                                  variant="outlined"
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                Le mot de passe du wifi est le mot de passe de
                                votre réseau wifi.
                            </FormDescription>
                        </FormItem>
            )}
                  />

                  <FormField
                    control={configureCarForm.control}
                    name="gatewayIp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adresse IP de la passerelle :</FormLabel>
                            <FormControl>
                                <Input
                                  inputMd
                                  onChangeText={field.onChange}
                                  placeholder="Adresse IP de la passerelle.."
                                  value={field.value}
                                  variant="outlined"
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                L'adresse IP de la passerelle est l'adresse IP
                                de votre routeur.
                            </FormDescription>
                        </FormItem>
            )}
                  />

                  <FormField
                    control={configureCarForm.control}
                    name="subnet"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Masque de sous-réseau :</FormLabel>
                            <FormControl>
                                <Input
                                  inputMd
                                  onChangeText={field.onChange}
                                  placeholder="Masque de sous-réseau.."
                                  value={field.value}
                                  variant="outlined"
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                Le masque de sous-réseau est l'adresse IP de
                                votre routeur.
                            </FormDescription>
                        </FormItem>
            )}
                  />

                  <FormField
                    control={configureCarForm.control}
                    name="mqttIp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adresse IP du broker MQTT :</FormLabel>
                            <FormControl>
                                <Input
                                  inputMd
                                  onChangeText={field.onChange}
                                  placeholder="Adresse IP du broker MQTT.."
                                  value={field.value}
                                  variant="outlined"
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                L'adresse IP du broker MQTT est l'adresse IP du
                                serveur MQTT.
                            </FormDescription>
                        </FormItem>
            )}
                  />

                  <div className="flex justify-between h-10">
                      <Button
                        buttonMd
                        disabled={loading}
                        onClick={configureCarForm.handleSubmit(onSubmit)}
                        variant="primary"
                      >
                          {loading ? 'Chargement...' : 'Configurer'}
                      </Button>
                      <Button
                        buttonMd
                        onClick={() => {
                configureCarForm.reset()
                router.replace('robothome')
              }}
                        variant="cancel"
                      >
                          Annuler
                      </Button>
                  </div>
              </form>
          </Form>
      </div>
  )
}
