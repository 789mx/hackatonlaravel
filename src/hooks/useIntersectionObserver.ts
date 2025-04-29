import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0.1
}: UseIntersectionObserverProps = {}) => {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const [elements, setElements] = useState<Element[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        setEntries(entries);
      },
      { root, rootMargin, threshold }
    );

    const { current: currentObserver } = observer;

    elements.forEach((element) => currentObserver.observe(element));

    return () => currentObserver.disconnect();
  }, [root, rootMargin, elements, threshold]);

  return {
    setElements,
    entries
  };
};