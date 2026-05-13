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

      if (currentTime < 0.5 && videoOpacity < 1) {
        setVideoOpacity(Math.min(1, currentTime / 0.5));
      }

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

    rafId = requestAnimationFrame(checkVideoProgress);

    video.play().catch(() => {
      console.log('Autoplay blocked');
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
          <a href="#studio" className="text-[#6F6F6F] hover:text-black transition-colors">Studio</a>
          <a href="#" className="text-[#6F6F6F] hover:text-black transition-colors">About</a>
          <a href="#" className="text-[#6F6F6F] hover:text-black transition-colors">Journal</a>
          <a href="#" className="text-[#6F6F6F] hover:text-black transition-colors">Reach Us</a>
        </div>

        <button className="px-6 py-2.5 text-sm font-medium bg-black text-white rounded-full hover:scale-[1.03] transition-transform">
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

      {/* STUDIO SECTION */}
      <section id="studio" className="relative bg-[#0A0A0A] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-xs tracking-[3px] mb-6">
              THE STUDIO
            </div>
            <h2 className="text-6xl sm:text-7xl instrument tracking-tight mb-6">
              Crafted in silence.
            </h2>
            <p className="max-w-xl mx-auto text-lg text-[#A1A1A1]">
              Every project begins with deep listening. We design digital spaces that feel like home for the mind.
            </p>
          </div>

          {/* Studio Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl aspect-[16/10] bg-zinc-900">
              <img 
                src="https://picsum.photos/id/1015/800/600" 
                alt="Digital Sanctuary" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-sm tracking-widest text-white/70 mb-2">01 — SANCTUARY</div>
                <h3 className="text-3xl instrument tracking-tight">The Quiet Room</h3>
                <p className="mt-3 max-w-xs text-[#C1C1C1]">A private digital space for deep focus and uninterrupted thought.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl aspect-[16/10] bg-zinc-900">
              <img 
                src="https://picsum.photos/id/1033/800/600" 
                alt="Thoughtful Platform" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-sm tracking-widest text-white/70 mb-2">02 — PLATFORM</div>
                <h3 className="text-3xl instrument tracking-tight">Aether Journal</h3>
                <p className="mt-3 max-w-xs text-[#C1C1C1]">A living archive for writers, thinkers, and long-form creators.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-3xl aspect-[16/10] bg-zinc-900">
              <img 
                src="https://picsum.photos/id/106/800/600" 
                alt="Cinematic Experience" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-sm tracking-widest text-white/70 mb-2">03 — EXPERIENCE</div>
                <h3 className="text-3xl instrument tracking-tight">Liminal</h3>
                <p className="mt-3 max-w-xs text-[#C1C1C1]">Immersive interfaces that blur the line between digital and physical.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative overflow-hidden rounded-3xl aspect-[16/10] bg-zinc-900">
              <img 
                src="https://picsum.photos/id/1074/800/600" 
                alt="Systems" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-sm tracking-widest text-white/70 mb-2">04 — SYSTEMS</div>
                <h3 className="text-3xl instrument tracking-tight">The Atlas</h3>
                <p className="mt-3 max-w-xs text-[#C1C1C1]">A knowledge operating system for teams that value clarity over speed.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <button className="px-10 py-4 border border-white/30 hover:bg-white hover:text-black transition-all rounded-full text-sm tracking-wider">
              EXPLORE THE STUDIO
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;