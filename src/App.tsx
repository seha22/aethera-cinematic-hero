import React, { useRef, useEffect, useState } from 'react';

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  const videoUrl = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;
    let isFadingOut = false;

    const handleEnded = () => {
      setVideoOpacity(0);
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      }, 100);
    };

    const checkVideoProgress = () => {
      if (!video) return;

      const { currentTime, duration } = video;
      if (!duration || isNaN(duration)) {
        rafId = requestAnimationFrame(checkVideoProgress);
        return;
      }

      const progress = currentTime / duration;

      // Fade in at the beginning
      if (currentTime < 0.5 && videoOpacity < 1) {
        setVideoOpacity(Math.min(1, currentTime / 0.5));
      }

      // Fade out near the end (last 0.5 seconds)
      if (progress > 0.92 && !isFadingOut) {
        isFadingOut = true;
        const fadeOutInterval = setInterval(() => {
          setVideoOpacity((prev) => {
            const newOpacity = Math.max(0, prev - 0.08);
            if (newOpacity <= 0.05) {
              clearInterval(fadeOutInterval);
              isFadingOut = false;
            }
            return newOpacity;
          });
        }, 50);
      }

      rafId = requestAnimationFrame(checkVideoProgress);
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', () => {
      setVideoOpacity(0);
      setTimeout(() => setVideoOpacity(1), 50);
    });

    // Start monitoring
    rafId = requestAnimationFrame(checkVideoProgress);

    // Auto play
    video.play().catch(() => {
      console.log('Autoplay blocked, user interaction required');
    });

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Video Background */}
      <div className="absolute inset-0 z-0" style={{ top: '300px', bottom: 0, left: 0, right: 0 }}>
        <video
          ref={videoRef}
          src={videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoOpacity, transition: 'opacity 0.5s ease-in-out' }}
          muted
          playsInline
          loop={false}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="text-3xl tracking-tight text-black instrument">
            Aethera<sup className="text-xs align-super">®</sup>
          </div>
        </div>

        <div className="flex items-center gap-10 text-sm">
          <a href="#" className="text-black hover:text-black transition-colors">Home</a>
          <a href="#" className="text-[#6F6F6F] hover:text-black transition-colors">Studio</a>
          <a href="#" className="text-[#6F6F6F] hover:text-black transition-colors">About</a>
          <a href="#" className="text-[#6F6F6F] hover:text-black transition-colors">Journal</a>
          <a href="#" className="text-[#6F6F6F] hover:text-black transition-colors">Reach Us</a>
        </div>

        <button 
          className="px-6 py-2.5 text-sm font-medium bg-black text-white rounded-full hover:scale-[1.03] transition-transform"
        >
          Begin Journey
        </button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6" 
           style={{ paddingTop: 'calc(8rem - 75px)', paddingBottom: '10rem' }}>
        
        <h1 className="text-5xl sm:text-7xl md:text-8xl max-w-7xl font-normal leading-[0.95] tracking-[-2.46px] text-black instrument animate-fade-rise">
          Beyond <span className="italic text-[#6F6F6F]">silence</span>, we build <span className="italic text-[#6F6F6F]">the eternal.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-[#6F6F6F] animate-fade-rise-delay">
          Building platforms for brilliant minds, fearless makers, and thoughtful souls. 
          Through the noise, we craft digital havens for deep work and pure flows.
        </p>

        <button 
          className="mt-12 px-14 py-5 text-base font-medium bg-black text-white rounded-full hover:scale-[1.03] transition-transform animate-fade-rise-delay-2"
        >
          Begin Journey
        </button>
      </div>
    </div>
  );
};

export default App;