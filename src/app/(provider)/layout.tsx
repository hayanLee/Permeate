import Providers from '@/providers';

import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

const ProviderLayout = ({ children }: PropsWithChildren) => {
  return (
    <Providers>
      {children}
      <Toaster richColors position="top-right" />
    </Providers>
  );
};

export default ProviderLayout;
