import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { LoginUserSchema, loginUserSchema } from "@incubator/shared"
import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function LoginForm() {
  const { handleLogin } = useAuth()

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
    const error = await handleLogin(values)

    if (error) {
      form.setError("root", {
        message: error.message,
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="container py-10">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your information to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
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
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                Login
              </Button>

              <FormRootError />
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={"/signup"} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
