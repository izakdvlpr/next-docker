import { Logged } from '@/cases/Logged';

interface LayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: 'My Profile',
};

export default function Layout({
  children,
}: LayoutProps): JSX.Element {
  return (
    <Logged>{children}</Logged>
  );
}