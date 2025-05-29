import '../../public/css/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Web3Modal } from '@/context/Web3Modal';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';
import StoreProvider from '@/script';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { sepolia } from 'viem/chains';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlueSe',
  description: 'Decentralized Social Networking',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Modal>
            <StoreProvider>
              {children}
              <Toaster position="bottom-right" reverseOrder={false} />
            </StoreProvider>
        </Web3Modal>
      </body>
    </html>
  );
}
