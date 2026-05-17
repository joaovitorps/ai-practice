import { createFileRoute } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { AuthContext } from "@core/auth-context";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { FormField } from "@ui/form";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await auth?.register(name, email, password);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Create a new account</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <FormField>
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormField>
        <FormField>
          <label htmlFor="register-email" className="text-sm font-medium text-gray-700">Email</label>
          <Input id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormField>
        <FormField>
          <label htmlFor="register-password" className="text-sm font-medium text-gray-700">Password</label>
          <Input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormField>
        <Button type="submit" className="w-full" disabled={auth?.isLoading}>{auth?.isLoading ? "Loading..." : "Register"}</Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        <a href="/login" className="text-gray-900 hover:underline">Already have an account?</a>
      </p>
    </div>
  );
}