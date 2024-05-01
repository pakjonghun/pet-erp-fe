import { redirect } from 'next/navigation';

const page = () => {
  redirect('/dashboard/product');
};

export default page;
