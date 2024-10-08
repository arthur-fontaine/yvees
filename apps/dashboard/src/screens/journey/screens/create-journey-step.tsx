import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from 'ui'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../shared/components/ui/form'
import { Textarea } from '../../../shared/components/ui/textarea'
import { toast } from '../../../shared/components/ui/use-toast'
import { RouteNames, router } from '../../../utils/router'
import { useInsertJourneyStep } from '../hooks/use-create-journey-step'
import type { JourneyStepForm } from '../types/create-journey-step'

const formSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: 'La description doit comporter au moins 10 caractères.',
    })
    .max(200, {
      message: 'La description ne doit pas dépasser 200 caractères.',
    }),
  name: z
    .string()
    .min(3, {
      message: 'Le nom doit comporter au moins 3 caractères.',
    })
    .max(20, {
      message: 'Le nom ne doit pas dépasser 20 caractères.',
    }),
})

/**
 *  JourneyStep Create screen.
 */
export function JourneyStepCreate({ journeyId }: { journeyId: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      description: '',
      name: '',
    },
    resolver: zodResolver(formSchema),
  })

  const { error, insertNewJourneyStep, loading } = useInsertJourneyStep()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const journeyStepData: JourneyStepForm = {
      description: data.description,
      draft: true,
      end: false,
      journeyId: Number(journeyId),
      name: data.name,
      start: false,
    }

    try {
      await insertNewJourneyStep(journeyStepData)
      toast({
        description: 'L\'étape a été créé avec succès !',
        duration: 3500,
        title: 'Parcours',
      })
      form.reset()
    }
 catch (err) {
      toast({
        description: 'Échec de la création de l\'étape.',
        duration: 3500,
        title: 'Erreur',
      })
    }
  }

  return (
      <div className="h-screen p-10">
          <h1 className="text-3xl font-bold my-8">Création d'une étape :</h1>
          <div>
              <p className="text-sm text-muted-foreground max-w-3xl">
                  Vous êtes entrain de créer une nouvelle étape. Après avoir
                  rempli les différents champs, vous pourrez accéder à la
                  page de cette étape.
              </p>
          </div>
          <h2 className="text-xl mt-8">Remplissez les différents champs :</h2>
          <Form {...form}>
              <form
                className="w-2/3 space-y-6 my-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom de l'étape :</FormLabel>
                            <FormControl>
                                <Input
                                  inputMd
                                  onChangeText={field.onChange}
                                  placeholder="Nom de l'étape.."
                                  variant="outlined"
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                Le début d'une nouvelle étape pour ton voyage..
                            </FormDescription>
                        </FormItem>
            )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mt-20">Description de l'étape :</FormLabel>
                            <FormControl>
                                <Textarea
                                  className="resize-none"
                                  placeholder="Description de l'étape.."
                                  {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                Détails supplémentaires sur l'étape..
                            </FormDescription>
                        </FormItem>
            )}
                  />
                  <div className="flex justify-between h-10">
                      <Button
                        buttonMd
                        onClick={form.handleSubmit(async (data) => {
                await onSubmit(data)
                if (!error) {
                  router.push(RouteNames.JOURNEY_HOME, { journeyId })
                }
              })}
                        variant="primary"
                      >
                          {loading ? 'Création en cours...' : 'Créer'}
                      </Button>
                      <Button
                        buttonMd
                        onClick={() => {
                form.reset()
                router.push(RouteNames.JOURNEY_HOME, { journeyId })
              }}
                        variant="cancel"
                      >
                          Annuler
                      </Button>
                  </div>
                  {error && <p className="text-red-600">{error}</p>}
              </form>
          </Form>
      </div>
  )
}
