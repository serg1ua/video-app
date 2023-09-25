import Link from 'next/link';
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type FC,
} from 'react';

type ButtonAnchorAttributes = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

interface ButtonProps extends ButtonAnchorAttributes {
  variant?: 'primary' | 'tertiary-gray';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  href?: string;
}

const Button: FC<ButtonProps> = ({ onClick, href, ...props }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2 py-1 text-sm',
    lg: 'px-2.5 py-1.5 text-sm',
    xl: 'px-3 py-2 text-sm',
    '2xl': 'px-3.5 py-2.5 text-sm',
  };

  const buttonClasses = [
    'bg-primary-600 text-white focus:ring-4 hover:bg-primary-700 shadow-sm',
    'font-semibold',
    'rounded-lg',
    sizeClasses['md'],
  ].join(' ');

  const commonProps = {
    onClick,
    className: buttonClasses,
    ...props,
  };

  return href ? (
    <Link href={href} {...commonProps} />
  ) : (
    <button {...commonProps} />
  );
};

export default Button;
