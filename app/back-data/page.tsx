'use client';

import { redirect } from 'next/navigation';
import { BackDataTabs } from './constants';

const BackDataPage = () => {
  redirect(`/${Object.keys(BackDataTabs)[0]}`);
};

export default BackDataPage;
