import ContactList from "../../components/ContactList";

const data = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123-456-7890",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      phoneNumber: "987-654-3210",
    },
  ];


const ContactsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Contacts</h1>
      <ContactList contacts={data} />
    </div>
  );
};
  
  export default ContactsPage;