"use client";

import { loginAction } from "@/actions/login";
import { useActionState } from "react";
import Link from "next/link";

const initialState = {
    message: ""
};

export function LoginForm() {
    const [state, action] = useActionState(loginAction, initialState);

    return (
        <form action={action} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-center text-xl font-bold mb-4">Sign in</h1>
            <label htmlFor="form-login.username" className="block mb-2 text-sm font-medium text-gray-700">
                Username
            </label>
            <input
                type="text"
                id="form-login.username"
                name="username"
                autoComplete="username"
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="form-login.password" className="block mb-2 text-sm font-medium text-gray-700">
                Password
            </label>
            <input
                type="password"
                id="form-login.password"
                name="password"
                autoComplete="current-password"
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Continue
            </button>
            <p className="mt-4 text-sm text-gray-600">{state.message}</p>
            <Link
                href="/signup"
                className="block w-full py-2 px-4 mt-2 text-center bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
                Create an account
            </Link>
            <Link
                href="/forgot-password"
                className="block w-full py-2 px-4 mt-2 text-center bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
                Forgot password?
            </Link>
        </form>
    );
}