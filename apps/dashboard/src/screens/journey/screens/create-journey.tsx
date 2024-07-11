import { zodResolver } from '@hookform/resolvers/zod'
import type { Journey } from 'db'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../../shared/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../shared/components/ui/form'
import { Input } from '../../../shared/components/ui/input'
import { Textarea } from '../../../shared/components/ui/textarea'
import { toast } from '../../../shared/components/ui/use-toast'
import { useInsertJourney } from '../hooks/use-create-journey'

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
 *  Journey Create screen.
 */
export function JourneyCreate() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      description: '',
      name: '',
    },
    resolver: zodResolver(formSchema),
  })

  const { error, insertNewJourney, loading } = useInsertJourney()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // const currentTimestamp = Math.floor(Date.now() / 1000)

    const journeyData: Journey = {
      // createdAt: currentTimestamp,
      description: data.description,
      draft: true,
      name: data.name,
      // updatedAt: currentTimestamp,
    }

    try {
      await insertNewJourney(journeyData)
      toast({
        description: 'Le parcours a été créé avec succès !',
        duration: 3500,
        title: 'Parcours',
      })
      form.reset()
    }
 catch (err) {
      toast({
        description: 'Échec de la création du parcours.',
        duration: 3500,
        title: 'Erreur',
      })
    }
  }

  return (
    <div className="h-screen p-10">
      <h1 className="text-3xl font-bold my-8">Création d'un parcours :</h1>
      <div>
        <p className="text-sm text-muted-foreground max-w-3xl">
          Vous êtes entrain de créer un nouveau parcours. Après avoir rempli les
          différents champs, vous pourrez accéder à la page de ce parcours, où
          vous pourrez modifier les champs et ajouter des étapes. À la création
          d'un parcours, les étapes de début et de fin sont automatiquement
          créées.
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
                <FormLabel>Nom du parcours :</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du parcours.." {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Le début d'un nouveau voyage pour ton musée..
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-20">Description du parcours :</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Description du parcours.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Détails supplémentaires sur le parcours..
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button
              className="hover:bg-white hover:text-orange hover:outline"
              disabled={loading}
              type="submit"
            >
              {loading ? 'Création en cours...' : 'Créer'}
            </Button>
            <Button
              className="bg-red-600 hover:bg-white hover:text-red-600 hover:outline"
              onClick={() => form.reset()}
              type="reset"
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
