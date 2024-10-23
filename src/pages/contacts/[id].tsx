import { useRouter } from 'next/router';

const ContactDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl">Contact Details {id}</h2>
      {/* Display contact details */}
    </div>
  );
};

export default ContactDetailsPage;
