import { useRouter } from "next/router";
import ContactList from "../../components/ContactList";
import { useState } from "react";

const ContactsPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleCreateContact = () => {
    router.push("/contacts/create"); // navigate to the Create Contact Page
  };

  const handleLogout = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const response = await fetch(`${baseUrl}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to log out");
      }

      // clear the token and redirect to login page
      localStorage.removeItem("token");
      router.push("/auth");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4 relative">
      {error && <div className="text-red-500">{error}</div>}
      <h1 className="text-3xl font-bold mb-4">Your Contacts</h1>
      <button
        onClick={handleCreateContact}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Create New Contact
      </button>

      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded"
      >
        Logout
      </button>

      <ContactList />
    </div>
  );
};

export default ContactsPage;
