import AuthForm from "@/src/components/AuthForm";

const AuthPage = () => {
  // Handle form submission logic
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
