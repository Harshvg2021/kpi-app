"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  // Initialize react-hook-form with Zod validation
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form Submitted", data);
    // Handle form submission (e.g., call an API for login)
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background:
          "radial-gradient(58.43% 103.88% at 56.74% 50%, #0085FF 0%, #003465 100%",
      }}
    >
      <div
        className="w-full max-w-md p-8 px-16 bg-white/5 border-white/10 border-2 rounded-3xl shadow"
        style={{
          borderImageSource:
            "linear-gradient(135.59deg, rgba(88, 130, 193, 0.49) 1.28%, rgba(88, 130, 193, 0.11) 96.26%)",
        }}
      >
        <h2 className="text-2xl font-semibold  text-white mb-6">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="username@gmail.com" {...field} />
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
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex text-white text-sm">
              <Link
                href="/forgot-password"
                className="text-white font-semibold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              // type="submit"
              onClick={() => router.push("/kpi/therapy")}
              className="w-full py-2 bg-[#003465] hover:bg-[#003465]  text-white font-semibold rounded-md"
            >
              Sign in
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-xs text-white font-semibold">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-white hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}
