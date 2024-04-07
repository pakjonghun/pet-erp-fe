import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import MainLayout from '@/components/layout/MainLayout';
import ThemeRegister from '@/context/ThemeRegister';
import QueryProvider from '@/context/QueryProvider';
import ApolloClientProvider from '@/context/ApolloClientProvider';
import Guard from '@/components/auth/Guard';
import SnackProvider from '@/context/SnackProvider';

export const metadata: Metadata = {
  title: '펫 ERP',
  description: '펫 ERP 웹',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloClientProvider>
          <QueryProvider>
            <AppRouterCacheProvider>
              <ThemeRegister>
                <SnackProvider>
                  <MainLayout>
                    <Guard>{children}</Guard>
                  </MainLayout>
                </SnackProvider>
              </ThemeRegister>
            </AppRouterCacheProvider>
          </QueryProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
