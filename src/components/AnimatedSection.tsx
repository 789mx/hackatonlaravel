import React, { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  threshold = 0.1
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setElements, entries } = useIntersectionObserver({
    threshold
  });

  useEffect(() => {
    if (sectionRef.current) {
      setElements([sectionRef.current]);
    }
  }, [setElements]);

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, [entries]);

  return (
    <div
      ref={sectionRef}
      className={`fade-in-section ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;