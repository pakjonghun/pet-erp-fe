'use client';

import { FC, ReactNode } from 'react';

interface Props {
  card: ReactNode;
}

const DashboardLayout: FC<Props> = ({ card }) => {
  return <>{card}</>;
};

export default DashboardLayout;
