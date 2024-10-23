import { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission (login/signup logic here)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-80"
    >
      <h3 className="text-lg font-semibold mb-4">
        {isLogin ? "Login" : "Sign Up"}
      </h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 w-full rounded"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-500 underline"
      >
        {isLogin ? "Create an account" : "Already have an account?"}
      </button>
    </form>
  );
};

export default AuthForm;
