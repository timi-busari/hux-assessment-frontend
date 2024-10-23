import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Contact } from "@/types/contacts";
import ContactForm from "@/components/ContactForm";

const EditContactPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchContact = async () => {
      if (!id) return;

      try {
        const response = await fetch(`${baseUrl}/contacts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch contact");
        }
        const data = await response.json();
        setContact(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleUpdateContact = async (updatedContact: Contact) => {
    try {
      const response = await fetch(`${baseUrl}/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedContact),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact");
      }

      // redirect to contacts list after updating
      router.push("/contacts");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Edit Contact </h2>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}{" "}
      {contact && (
        <ContactForm
          firstName={contact.firstName}
          lastName={contact.lastName}
          phoneNumber={contact.phoneNumber}
          contactId={contact._id}
          onSubmit={handleUpdateContact}
        />
      )}
      {loading && <p className="text-blue-500">Updating contact...</p>}{" "}
    </div>
  );
};

export default EditContactPage;
