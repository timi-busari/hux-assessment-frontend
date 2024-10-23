import { Contact, ContactListProps } from "../types/contacts";
import ContactCard from "./ContactCard";

const ContactList = ({ contacts }: ContactListProps) => {
  return (
    <div className="space-y-4">
      {contacts.map((contact: Contact, index) => (
        <ContactCard key={index} {...contact} />
      ))}
    </div>
  );
};

export default ContactList;
