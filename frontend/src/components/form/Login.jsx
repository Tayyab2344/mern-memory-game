import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUsers } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Loginform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Memory Master";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const loginMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(
        "https://mern-memory-game-git-main-tayyabs-projects-9d235f55.vercel.app/api/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(setUsers({ token: data.token, user: data.user }));
      localStorage.setItem("userdata", JSON.stringify(data));
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error.response?.data || error.message);
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 px-4 py-8">
      {/* Floating Memory Cards Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-12 h-12 bg-yellow-400 rounded-lg rotate-12 opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-8 h-8 bg-green-400 rounded-lg -rotate-12 opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-32 w-10 h-10 bg-blue-400 rounded-lg rotate-45 opacity-25 animate-pulse"></div>
        <div className="absolute bottom-40 right-16 w-6 h-6 bg-red-400 rounded-lg -rotate-45 opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-20 w-14 h-14 bg-indigo-400 rounded-lg rotate-12 opacity-15 animate-pulse"></div>
        <div className="absolute top-20 right-1/3 w-8 h-8 bg-orange-400 rounded-lg -rotate-12 opacity-25 animate-bounce"></div>
      </div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg border-4 border-white/20 backdrop-blur-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header with Game Elements */}
          <div className="text-center pt-8 pb-6">
            <div className="flex items-center justify-center mb-4">
              {/* Memory Card Icons */}
              <div className="flex space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-lg shadow-lg transform rotate-12"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg shadow-lg transform -rotate-12"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg shadow-lg transform rotate-6"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg shadow-lg transform -rotate-6"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Memory Master
            </h1>
            <p className="text-gray-600 text-sm font-medium">
              🧠 Challenge Your Mind • Test Your Memory 🎯
            </p>
          </div>

          <div className="px-8 pb-8">
            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2 text-sm"
              >
                📧 Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email to start playing"
                {...register("email")}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  ⚠️ {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-8">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2 text-sm"
              >
                🔐 Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your secret code"
                {...register("password")}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  ⚠️ {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginMutation.isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:transform-none mb-4"
            >
              {loginMutation.isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Loading Game...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  🚀 Start Playing!
                </span>
              )}
            </button>

            {loginMutation.isError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm text-center">
                ❌{" "}
                {loginMutation.error.response?.data?.message ||
                  "Login failed. Try again."}
              </div>
            )}

            <p className="text-center mb-6 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-500 font-medium hover:underline transition duration-200"
              >
                Sign up here
              </Link>
            </p>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm font-medium">
                or continue with
              </span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full bg-white border-2 border-gray-200 hover:border-red-300 text-gray-700 font-semibold py-3 px-6 rounded-xl shadow-sm transform transition-all duration-200 hover:scale-105 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285f4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34a853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#fbbc05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#ea4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl shadow-sm transform transition-all duration-200 hover:scale-105 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Continue with GitHub
              </button>
            </div>

            <div className="text-center mt-8 text-xs text-gray-500">
              Ready to test your memory? 🧩 Let's see how sharp your mind is!
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginform;
