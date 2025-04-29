import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  shadow?: boolean;
  hover?: boolean;
  border?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  shadow = true,
  hover = false,
  border = false,
}) => {
  return (
    <div
      className={`
        bg-black rounded-lg overflow-hidden
        ${shadow ? 'shadow-md' : ''}
        ${hover ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg' : ''}
        ${border ? 'border border-gray-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>;
};

export const CardContent: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-6 border-t border-gray-200 ${className}`}>{children}</div>;
};

export default Card;