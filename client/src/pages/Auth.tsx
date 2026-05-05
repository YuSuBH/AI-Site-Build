import React, { useState } from "react";
import { signIn, signUp } from "../lib/auth-client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (!formData.name) {
          toast.error("Name is required");
          return;
        }
        await signUp.email(
          {
            email: formData.email,
            password: formData.password,
            name: formData.name,
          },
          {
            onSuccess: () => {
              toast.success("Account created successfully!");
              navigate("/");
            },
            onError: (ctx) => {
              toast.error(ctx.error.message || "Failed to create account");
            },
          }
        );
      } else {
        await signIn.email(
          {
            email: formData.email,
            password: formData.password,
          },
          {
            onSuccess: () => {
              toast.success("Signed in successfully!");
              navigate("/");
            },
            onError: (ctx) => {
              toast.error(ctx.error.message || "Invalid credentials");
            },
          }
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Image is in Navbar or App root, but if we need a backdrop we can use one */}
      <div className="max-w-md w-full space-y-8 bg-[#DFF1F1]/50 backdrop-blur-lg p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-black">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-[#FF0000] hover:text-[#FF0000] transition-colors"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-[#BBD5DA] bg-[#DFF1F1]/50 placeholder-slate-400 text-black focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-[#FF0000] focus:z-10 sm:text-sm transition-all"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-[#BBD5DA] bg-[#DFF1F1]/50 placeholder-slate-400 text-black focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-[#FF0000] focus:z-10 sm:text-sm transition-all"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-[#BBD5DA] bg-[#DFF1F1]/50 placeholder-slate-400 text-black focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-[#FF0000] focus:z-10 sm:text-sm transition-all"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-[#FF0000] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000] focus:ring-offset-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isSignUp ? (
                "Sign up"
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
