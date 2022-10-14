import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface Validate {
  message : string;
  email : [string],
  password : [string],
}

const Signin = () => {

  const loginUrl = 'https://api.jabarresearch.com/api/login';

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState<Validate>();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    await axios.post(loginUrl, formData)
    .then((response) => {

      localStorage.setItem('token', response.data.token);

      navigate('/dashboard');
    }).catch((error) => {
        setValidation(error.response.data);
    });
  };

  function wrapAsyncFunction<ARGS extends unknown[]>(fn: (...args: ARGS) => Promise<unknown>): (...args: ARGS) => void {
    return (...args) => {
      void fn(...args);
    };
  }

  return (
    <div className="grid grid-cols-2 h-screen">
      <div
        className="bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url("${
            process.env.PUBLIC_URL + "/photo-1563267292-b787b0ae72bf.jpeg"
          }")`,
        }}
      ></div>
      <div className="flex justify-center items-center w-full px-28">
        <div className="w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/"
                className="font-medium text-cyan-600 hover:text-cyan-500"
              >
                start your 14-day free trial
              </Link>
            </p>
          </div>
          {
              validation?.message && (
                  <div className="alert alert-danger">
                      {validation?.message}
                  </div>
              )
          }
          <form className="mt-8 space-y-6" onSubmit={wrapAsyncFunction(handleLogin)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {
                  validation?.email && (
                      <div className="alert alert-danger">
                          {validation?.email[0]}
                      </div>
                  )
              }
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {
                  validation?.email && (
                      <div className="alert alert-danger">
                          {validation?.password[0]}
                      </div>
                  )
              }
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/"
                  className="font-medium text-cyan-600 hover:text-cyan-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-cyan-500 group-hover:text-cyan-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
