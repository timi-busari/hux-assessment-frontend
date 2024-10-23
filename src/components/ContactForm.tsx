import { useState, useEffect } from "react";
import { Contact, ContactFormProps } from "../types/contacts";

const ContactForm = ({
  firstName = "",
  lastName = "",
  phoneNumber = "",
  contactId,
  onSubmit,
}: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: firstName,
    surname: lastName,
    phone: phoneNumber,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If contactId is provided, it means we're editing an existing contact
    if (contactId) {
      setFormData({
        name: firstName,
        surname: lastName,
        phone: phoneNumber,
      });
    }
  }, [firstName, lastName, phoneNumber, contactId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // phone number regex for NGN
    const phoneRegex =
      /^(?:\+234|0)(7012345678|701234567|70123456|7012345|701234|70123|7012|701|70)\d{7}$/;

    // validate phone number input
    if (name === "phone" && !phoneRegex.test(value)) {
      setError(
        "Invalid phone number format. Please use +234 or 0 followed by 9 digits."
      );
    } else {
      setError(null);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedContact = {
      firstName: formData.name,
      lastName: formData.surname,
      phoneNumber: formData.phone,
      _id: contactId || "",
    };
    onSubmit(updatedContact); // call the onSubmit function passed from the parent
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <input
        type="text"
        name="name"
        placeholder="First Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="text"
        name="surname"
        placeholder="Last Name"
        value={formData.surname}
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
        required
      />
      {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 w-full rounded"
      >
        {contactId ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
