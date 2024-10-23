import { useRouter } from "next/router";
import ContactForm from "../../components/ContactForm";
import { Contact } from "../../types/contacts";
import { useState } from "react";

const CreateContactPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleCreateContact = async (contact: Contact) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        // redirect to contacts list page after successful creation
        router.push("/contacts");
      }

      const errorData = await response.json();
      setError(errorData.message || "Failed to create contact");
    } catch (error: any) {
      console.error("Error creating contact:", error);
      setError(error.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Create New Contact</h2>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}{" "}
      <ContactForm onSubmit={handleCreateContact} />
      {isLoading && <p className="text-blue-500">Creating contact...</p>}{" "}
    </div>
  );
};

export default CreateContactPage;
