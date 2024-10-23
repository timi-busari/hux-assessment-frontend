import { useRouter } from "next/router";
import { FormEvent, useReducer, useEffect } from "react";

// Define the state and action types
interface AuthState {
  username: string;
  password: string;
  isLogin: boolean;
  isLoading: boolean;
  message: string | null;
  error: string | null;
}

type AuthAction =
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "TOGGLE_LOGIN" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_MESSAGE"; payload: string | null }
  | { type: "SET_ERROR"; payload: string | null };

// The reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "TOGGLE_LOGIN":
      return { ...state, isLogin: !state.isLogin };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const AuthForm = ({ mode = "login" }: { mode?: "login" | "signup" }) => {
  // Initial states
  const initialState: AuthState = {
    username: "",
    password: "",
    isLogin: mode === "login",
    isLoading: false,
    message: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_MESSAGE", payload: null });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const response = await fetch(
        `${baseUrl}/users/${state.isLogin ? "login" : "register"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: state.username,
            password: state.password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        dispatch({ type: "SET_MESSAGE", payload: "Success! Redirecting..." });
        setTimeout(() => router.push("/contacts"), 2000);
      } else {
        throw new Error(result.message || "Something went wrong.");
      }
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Effect to update state when mode changes
  useEffect(() => {
    dispatch({ type: "SET_USERNAME", payload: "" });
    dispatch({ type: "SET_PASSWORD", payload: "" });
    dispatch({ type: "TOGGLE_LOGIN" });
  }, [mode]);

  return (
    <div>
      {state.error && <div className="text-red-500">{state.error}</div>}
      {state.message && <div className="text-green-500">{state.message}</div>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h3 className="text-lg font-semibold mb-4 text-black">
          {state.isLogin ? "Login" : "Sign Up"}
        </h3>
        <input
          type="text"
          placeholder="Username"
          value={state.username}
          onChange={(e) =>
            dispatch({ type: "SET_USERNAME", payload: e.target.value })
          }
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
          className="border p-2 mb-4 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 w-full rounded"
          disabled={state.isLoading}
        >
          {state.isLoading ? "Loading..." : state.isLogin ? "Login" : "Sign Up"}
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "TOGGLE_LOGIN" })}
          className="mt-4 text-blue-500 underline"
        >
          {state.isLoading
            ? "Loading..."
            : state.isLogin
            ? "Create an account"
            : "Already have an account?"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
