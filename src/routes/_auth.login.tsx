import { createFileRoute } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { AuthContext } from "@core/auth-context";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { FormField } from "@ui/form";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await auth?.login(email, password);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Sign in to your account</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <FormField>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormField>
        <FormField>
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormField>
        <Button type="submit" className="w-full" disabled={auth?.isLoading}>{auth?.isLoading ? "Loading..." : "Log in"}</Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        <a href="/register" className="text-gray-900 hover:underline">Create an account</a>
      </p>
    </div>
  );
}