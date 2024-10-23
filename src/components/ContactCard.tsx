import { Contact, ContactListProps } from "../types/contacts";

const ContactCard = ( {...contact} : Contact) => {
  const handleDelete = () => {
    // Handle deletion logic
  };

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold">
          {contact.firstName} {contact.lastName}
        </h3>
        <p>{contact.phoneNumber}</p>
      </div>
      <div>
        <button
          className="text-blue-500"
          onClick={() => {} /* Navigate to edit page */}
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
