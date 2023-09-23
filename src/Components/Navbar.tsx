import { Logo } from './Icons';

interface NavbarProps {
  navbarItem?: JSX.Element;
}

interface NavbarItem {
  icon: (className: string) => JSX.Element;
  name: string;
  path: string;
}

export default function Navbar() {
  return (
    <>
      <Logo />
    </>
  );
}
