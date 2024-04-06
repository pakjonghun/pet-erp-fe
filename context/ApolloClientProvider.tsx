'use client';

import { client } from '@/api/graphql/client';
import { ApolloProvider } from '@apollo/client';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ApolloClientProvider: FC<Props> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
