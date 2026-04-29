"use client";

import api from "@/utils/api";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

type InputErrors = {
  username?: string;
  email?: string;
  password?: string;
  fullname?: string;
};

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
  });
  const [inputErrors, setInputErrors] = useState<InputErrors>({});
  const [isPassoword, setIsPassword] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (inputErrors[name as keyof InputErrors]) {
      setInputErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/auth/register", form);

      if (response.status === 200 || response.status === 201) {
        setForm({
          username: "",
          email: "",
          password: "",
          fullname: "",
        });
        toast.success("User registration successful");
        router.push("/sign-in");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to register user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-sm border border-neutral-400 rounded-lg p-8 w-full mx-4">
        <div className=" text-center">
          <h1 className="text-2xl font-bold">Create your account!</h1>
          <p className="text-sm text-neutral-600">
            Enter details to create your account
          </p>
        </div>
        <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm text-neutral-600" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Ex: johndoe"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-neutral-200 px-2 py-1 rounded focus:outline-neutral-500 text-sm"
            />
            {inputErrors.username && (
              <p className="text-xs text-red-500 font-medium">
                {inputErrors.username}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-neutral-600" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Ex: johndoe@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-neutral-200 px-2 py-1 rounded focus:outline-neutral-500 text-sm"
            />
            {inputErrors.email && (
              <p className="text-xs text-red-500 font-medium">
                {inputErrors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm text-neutral-600" htmlFor="fullname">
              Full name
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Ex: John doe"
              value={form.fullname}
              onChange={handleChange}
              className="w-full border border-neutral-200 px-2 py-1 rounded focus:outline-neutral-500 text-sm"
            />
            {inputErrors.fullname && (
              <p className="text-xs text-red-500 font-medium">
                {inputErrors.fullname}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm text-neutral-600" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={isPassoword ? "password" : "text"}
                placeholder="Ex: Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-neutral-200 px-2 py-1 rounded focus:outline-neutral-500 text-sm"
              />
              <div className="absolute right-4 top-1.5">
                {isPassoword ? (
                  <EyeOff
                    onClick={() => setIsPassword(false)}
                    className="size-4"
                  />
                ) : (
                  <Eye onClick={() => setIsPassword(true)} className="size-4" />
                )}
              </div>
            </div>

            {inputErrors.password && (
              <p className="text-xs text-red-500 font-medium">
                {inputErrors.password}
              </p>
            )}
          </div>

          <div className="mt-5">
            <button
              className="w-full py-1 text-center bg-neutral-800 text-white hover:bg-neutral-700 cursor-pointer rounded-md flex items-center justify-center"
              type="submit"
            >
              {loading ? (
                <span className="flex gap-2 items-center text-sm">
                  <Loader className="size-6 animate-spin" />
                  Wait a second...
                </span>
              ) : (
                <span>Sign up</span>
              )}
            </button>
          </div>

          <div className="text-center text-xs text-neutral-500">
            <p className=" mt-2 text-sm">
              Allready have an account?.{" "}
              <Link href={"/sign-in"} className="text-blue-600">
                login here
              </Link>
            </p>
            <Link href={"/"}>Back to home</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
