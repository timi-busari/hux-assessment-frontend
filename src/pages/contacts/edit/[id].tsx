import { useRouter } from 'next/router';

const EditContactPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl">Edit Contact {id}</h2>
      <form>
        {/* Form fields pre-filled with existing data */}
        <button type="submit">Update Contact</button>
      </form>
    </div>
  );
};

export default EditContactPage;
