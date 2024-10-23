import { EventHandler, useState } from "react";
import { Contact } from "../types/contacts";

const ContactForm = ({ ...contact }: Contact) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(contact?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(contact?.phoneNumber || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle create or update logic
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border p-2 mb-4 w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 w-full rounded"
      >
        {contact ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
