import React, { useEffect, useState, useRef } from 'react';

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const isMountedRef = useRef(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with error handling
    audioRef.current = new Audio();
    audioRef.current.volume = 0.3;
    
    // Add multiple source formats for better browser compatibility
    const audioSources = [
      '/startup.mp3',
      '/startup.wav',
      '/startup.ogg'
    ];

    const handleAudioError = () => {
      console.warn('Audio failed to load or play - continuing without sound');
      if (isMountedRef.current) {
        setTimeout(() => {
          setIsVisible(false);
          onComplete();
        }, 2000);
      }
    };

    const playSound = async () => {
      if (!audioRef.current) return handleAudioError();

      // Try each audio source until one works
      for (const source of audioSources) {
        try {
          audioRef.current.src = source;
          
          // Set up error handler before attempting to load
          audioRef.current.onerror = () => {
            // If this source fails, we'll try the next one
            console.warn(`Failed to load audio source: ${source}`);
          };
          
          // Attempt to load the audio
          await audioRef.current.load();
          
          // Attempt to play
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            
            // If we get here, the audio started playing successfully
            audioRef.current.onended = () => {
              if (isMountedRef.current) {
                setIsVisible(false);
                onComplete();
              }
            };
            
            // Successfully started playing, so break the loop
            return;
          }
        } catch (error) {
          console.warn(`Error with audio source ${source}:`, error);
          // Continue to next source
          continue;
        }
      }
      
      // If we get here, none of the sources worked
      handleAudioError();
    };

    playSound();

    return () => {
      isMountedRef.current = false;
      if (audioRef.current) {
        audioRef.current.onerror = null;
        audioRef.current.onended = null;
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <img 
        src="/hackathon-logo.png" 
        alt="Hackathon 2025"
        className="w-96 h-96 object-contain animate-pulse-glow"
      />
    </div>
  );
};

export default SplashScreen;