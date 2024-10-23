import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Contact } from "../../types/contacts";

const ContactDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
          const data: Contact = await response.json();
          setContact(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchContact();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!contact) return <div>No contact found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {contact.firstName} {contact.lastName}
      </h1>
      <p className="text-lg">Phone Number: {contact.phoneNumber}</p>
    </div>
  );
};

export default ContactDetailsPage;
