import { useEffect, useState } from "react";
import { Contact } from "../types/contacts";
import ContactCard from "./ContactCard";

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        const response = await fetch(`${baseUrl}/contacts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}` || "",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.message || "Failed to fetch contacts");
          return; // exit early if there's an error
        }

        setContacts(data); // only set contacts if the response was ok
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if there are no contacts to display
  if (contacts.length === 0) {
    return <div>No contacts available.</div>;
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact: Contact) => (
        <ContactCard key={contact._id} {...contact} />
      ))}
    </div>
  );
};

export default ContactList;
