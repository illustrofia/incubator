import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
  Input,
} from "@/components/ui"
import { useAuth } from "@/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  RegisterUserSchema,
  loginUserSchema,
  registerUserSchema,
} from "@incubator/shared"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface AuthFormProps {
  action: "login" | "signup"
}

export const AuthForm = ({ action }: AuthFormProps) => {
  const { handleLogin, handleRegister } = useAuth()

  const form = useForm<RegisterUserSchema>({
    resolver: zodResolver(
      action === "login" ? loginUserSchema : registerUserSchema,
    ),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values: RegisterUserSchema) => {
    setIsLoading(true)

    let error = null

    if (action === "signup") {
      error = await handleRegister(values)
    } else {
      error = await handleLogin(values)
    }

    if (error) {
      form.setError("root", {
        message: error.message,
      })
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {action === "signup" && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
        {action === "signup" && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>

        <FormRootError />
      </form>
    </Form>
  )
}
