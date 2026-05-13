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
    <div className="bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto bg-white/80 backdrop-blur-md">
        <div className="flex items-center">
          <div className="text-3xl tracking-tight text-black instrument">
            Aethera<sup className="text-xs align-super">®</sup>
          </div>
        </div>

        <div className="flex items-center gap-10 text-sm">
          <a href="#" className="text-black hover:text-black transition-colors">Home</a>
          <a href="#studio" className="text-[#6F6F6F] hover:text-black transition-colors">Studio</a>
          <a href="#about" className="text-[#6F6F6F] hover:text-black transition-colors">About</a>
          <a href="#journal" className="text-[#6F6F6F] hover:text-black transition-colors">Journal</a>
          <a href="#" className="text-[#6F6F6F] hover:text-black transition-colors">Reach Us</a>
        </div>

        <button className="px-6 py-2.5 text-sm font-medium bg-black text-white rounded-full hover:scale-[1.03] transition-transform">
          Begin Journey
        </button>
      </nav>

      {/* HERO SECTION WITH VIDEO */}
      <div className="relative min-h-[100dvh] flex flex-col pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ top: '300px', bottom: 0 }}>
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

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 flex-1" style={{ paddingBottom: '8rem' }}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl max-w-7xl font-normal leading-[0.95] tracking-[-2.46px] text-black instrument animate-fade-rise">
            Beyond <span className="italic text-[#6F6F6F]">silence</span>, we build <span className="italic text-[#6F6F6F]">the eternal.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-[#6F6F6F] animate-fade-rise-delay">
            Building platforms for brilliant minds, fearless makers, and thoughtful souls. 
            Through the noise, we craft digital havens for deep work and pure flows.
          </p>

          <button className="mt-12 px-14 py-5 text-base font-medium bg-black text-white rounded-full hover:scale-[1.03] transition-transform animate-fade-rise-delay-2">
            Begin Journey
          </button>
        </div>
      </div>

      {/* STUDIO SECTION */}
      <section id="studio" className="relative bg-[#0A0A0A] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
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

          <div className="grid md:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden rounded-3xl aspect-[16/10] bg-zinc-900">
              <img src="https://picsum.photos/id/1015/800/600" alt="Digital Sanctuary" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-sm tracking-widest text-white/70 mb-2">01 — SANCTUARY</div>
                <h3 className="text-3xl instrument tracking-tight">The Quiet Room</h3>
                <p className="mt-3 max-w-xs text-[#C1C1C1]">A private digital space for deep focus and uninterrupted thought.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl aspect-[16/10] bg-zinc-900">
              <img src="https://picsum.photos/id/1033/800/600" alt="Thoughtful Platform" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-sm tracking-widest text-white/70 mb-2">02 — PLATFORM</div>
                <h3 className="text-3xl instrument tracking-tight">Aether Journal</h3>
                <p className="mt-3 max-w-xs text-[#C1C1C1]">A living archive for writers, thinkers, and long-form creators.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl aspect-[16/10] bg-zinc-900">
              <img src="https://picsum.photos/id/106/800/600" alt="Cinematic Experience" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-sm tracking-widest text-white/70 mb-2">03 — EXPERIENCE</div>
                <h3 className="text-3xl instrument tracking-tight">Liminal</h3>
                <p className="mt-3 max-w-xs text-[#C1C1C1]">Immersive interfaces that blur the line between digital and physical.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl aspect-[16/10] bg-zinc-900">
              <img src="https://picsum.photos/id/1074/800/600" alt="Systems" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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

      {/* ABOUT SECTION */}
      <section id="about" className="bg-white py-24 px-6 border-t border-zinc-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-x-12 items-center">
            <div className="md:col-span-7">
              <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-xs tracking-[3px] mb-8">
                OUR PHILOSOPHY
              </div>

              <h2 className="text-6xl sm:text-7xl instrument tracking-tighter leading-none mb-10">
                We design for<br />those who think<br />deeply.
              </h2>

              <div className="max-w-[520px] text-lg text-[#555555] leading-relaxed">
                Aethera was born from a simple belief: the most meaningful work happens in silence. 
                We create digital environments that protect attention, honor slowness, and invite presence.
              </div>

              <div className="mt-12 flex items-center gap-4">
                <div className="w-px h-12 bg-black/30" />
                <div>
                  <div className="font-medium">— Elena Voss</div>
                  <div className="text-sm text-[#777777]">Founder &amp; Principal</div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 mt-12 md:mt-0">
              <div className="relative">
                <img src="https://picsum.photos/id/1027/700/900" alt="Elena Voss" className="rounded-3xl shadow-xl w-full" />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl rounded-2xl border border-zinc-100 max-w-[240px]">
                  <div className="text-xs tracking-widest text-black/60 mb-1">EST. 2021</div>
                  <div className="text-xl instrument tracking-tight">Aethera</div>
                  <div className="text-sm mt-1 text-[#666]">New York • Remote</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-16 border-t border-zinc-200">
            <div className="text-center mb-12">
              <div className="text-sm tracking-[2px] text-black/60">WHAT WE STAND FOR</div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl instrument mb-6">01</div>
                <h4 className="text-2xl tracking-tight mb-4">Depth over Speed</h4>
                <p className="text-[#666666]">We reject the cult of productivity. Every pixel, every interaction is considered with care.</p>
              </div>
              <div>
                <div className="text-5xl instrument mb-6">02</div>
                <h4 className="text-2xl tracking-tight mb-4">Restraint as Beauty</h4>
                <p className="text-[#666666]">We believe less is more. We remove until only the essential remains.</p>
              </div>
              <div>
                <div className="text-5xl instrument mb-6">03</div>
                <h4 className="text-2xl tracking-tight mb-4">Presence &amp; Clarity</h4>
                <p className="text-[#666666]">Technology should disappear. What remains is calm, focus, and meaning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNAL SECTION */}
      <section id="journal" className="bg-white py-24 px-6 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-xs tracking-[3px] mb-6">
              JOURNAL
            </div>
            <h2 className="text-6xl sm:text-7xl instrument tracking-tight mb-4">
              Thoughts worth keeping.
            </h2>
            <p className="max-w-lg mx-auto text-lg text-[#666666]">
              Essays, notes, and reflections on design, technology, and the quiet life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-6">
                <img 
                  src="https://picsum.photos/id/1036/600/400" 
                  alt="The Cost of Constant Connection" 
                  className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="flex items-center gap-3 text-xs tracking-widest text-black/60 mb-3">
                <span>ESSAY</span> 
                <span>•</span> 
                <span>MAY 12, 2026</span>
              </div>
              <h3 className="text-2xl instrument tracking-tight leading-tight mb-3 group-hover:underline">
                The Cost of Constant Connection
              </h3>
              <p className="text-[#666666] line-clamp-3">
                In a world that rewards availability, choosing silence has become a radical act.
              </p>
              <div className="mt-4 text-sm text-black/60 flex items-center gap-2">
                8 min read <span className="text-xs">→</span>
              </div>
            </div>

            {/* Article 2 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-6">
                <img 
                  src="https://picsum.photos/id/1049/600/400" 
                  alt="Designing for Slowness" 
                  className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="flex items-center gap-3 text-xs tracking-widest text-black/60 mb-3">
                <span>NOTE</span> 
                <span>•</span> 
                <span>MAY 5, 2026</span>
              </div>
              <h3 className="text-2xl instrument tracking-tight leading-tight mb-3 group-hover:underline">
                Designing for Slowness
              </h3>
              <p className="text-[#666666] line-clamp-3">
                Why the best interfaces feel invisible. And why speed is not always the goal.
              </p>
              <div className="mt-4 text-sm text-black/60 flex items-center gap-2">
                12 min read <span className="text-xs">→</span>
              </div>
            </div>

            {/* Article 3 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-6">
                <img 
                  src="https://picsum.photos/id/1061/600/400" 
                  alt="Why We Removed Notifications" 
                  className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="flex items-center gap-3 text-xs tracking-widest text-black/60 mb-3">
                <span>ESSAY</span> 
                <span>•</span> 
                <span>APRIL 28, 2026</span>
              </div>
              <h3 className="text-2xl instrument tracking-tight leading-tight mb-3 group-hover:underline">
                Why We Removed Notifications
              </h3>
              <p className="text-[#666666] line-clamp-3">
                The quiet revolution happening inside the most thoughtful digital products.
              </p>
              <div className="mt-4 text-sm text-black/60 flex items-center gap-2">
                6 min read <span className="text-xs">→</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <button className="px-10 py-4 border border-black/30 hover:bg-black hover:text-white transition-all rounded-full text-sm tracking-wider">
              VIEW ALL ARTICLES
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;