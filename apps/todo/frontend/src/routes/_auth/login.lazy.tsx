import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useAuth } from "@/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginUserSchema, loginUserSchema } from "@incubator/shared"
import { createLazyFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const Route = createLazyFileRoute("/_auth/login")({
  component: LoginForm,
})

function LoginForm() {
  const { handleLogin, errors: authErrors } = useAuth()
  const form = useForm<LoginUserSchema>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values: LoginUserSchema) => {
    setIsLoading(true)
    await handleLogin(values)
    setIsLoading(false)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
        {authErrors &&
          authErrors.map((error, index) => (
            <p className="text-red-400" key={index}>
              {error}
            </p>
          ))}
      </form>
    </Form>
  )
}
