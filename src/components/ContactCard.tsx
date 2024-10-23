import { useRouter } from "next/router";
import { Contact, ContactListProps } from "../types/contacts";
import { useState } from "react";
import Link from "next/link";

const ContactCard = ({ ...contact }: Contact) => {
  const router = useRouter();

  const [message, setMessage] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const response = await fetch(`${baseUrl}/contacts/${contact._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setMessage("Contact deleted successfully");
        // refresh the contacts list after deletion
        router.reload();
      } else {
        setMessage("Failed to delete the contact.");
      }
    } catch (error) {
      setMessage("Error deleting contact.");
    }
  };

  const handleEdit = () => {
    router.push(`/contacts/edit/${contact._id}`);
  };

  if (message) {
    return <div>{message}</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <Link href={`/contacts/${contact._id}`}>
          <h3 className="text-xl font-semibold">
            {contact.firstName} {contact.lastName}
          </h3>
        </Link>
        <p>{contact.phoneNumber}</p>
      </div>
      <div>
        <button
          className="text-blue-500"
          onClick={
            () => {
              handleEdit();
            } /* navigate to edit page */
          }
        >
          Edit
        </button>
        <button className="text-red-500 ml-4" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
