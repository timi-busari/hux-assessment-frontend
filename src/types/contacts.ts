export interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;

}

export interface ContactListProps {
    contacts: Contact[];
  }

  export interface ContactFormProps {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    contactId?: string;
    onSubmit: (contact: Contact) => void;
  }

