import { NotLogged } from '@/cases/NotLogged';

interface LayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: 'Login',
};

export default function Layout({
  children,
}: LayoutProps): JSX.Element {
  return (
    <NotLogged>{children}</NotLogged>
  );
}