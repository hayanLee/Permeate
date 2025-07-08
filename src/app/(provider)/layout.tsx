import Providers from '@/providers';

import { PropsWithChildren } from 'react';

const ProviderLayout = ({ children }: PropsWithChildren) => {
  return <Providers>{children}</Providers>;
};

export default ProviderLayout;
