export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  // email: string;
  phoneNumber: string;
  // address: string;
  // notes: string;
}

export interface ContactListProps {
    contacts: Contact[];
  }

