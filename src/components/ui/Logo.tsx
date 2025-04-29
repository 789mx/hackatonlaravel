import React from 'react';
import { Code } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "text-blue-600" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Code className="h-8 w-8" />
    </div>
  );
};

export default Logo;