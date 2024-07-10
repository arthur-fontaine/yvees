import { zodResolver } from '@hookform/resolvers/zod'
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

const formSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
})

/**
 *  Journey Create screen.
 */
export function JourneyCreate() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(data, undefined, 2)}
          </code>
        </pre>
      ),
      title: 'You submitted the following values:',
    })
  }

  return (
    <>
      <div className="h-screen p-10 ">
        <h1 className="text-3xl font-bold my-8">Création d'un parcours :</h1>
        <Form {...form}>
          <form
            className="w-2/3 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remplissez les différents champs :</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nom du parcours.."
                      {...field}
                    />
                  </FormControl>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Description du parcours.."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can
                    <span>@mention</span>
                    other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  )
}
