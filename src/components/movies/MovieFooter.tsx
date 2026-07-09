import { useEffect, useRef, useState } from "react";
import { Github, Instagram, Mail, ArrowUp } from "lucide-react";

export default function MovieFooter() {
  const [showTop, setShowTop] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const isDown = y > lastYRef.current;

        if (y < 300) setShowTop(false);
        else setShowTop(isDown);

        lastYRef.current = y;
        tickingRef.current = false;
      });
    };

    lastYRef.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <footer className="bg-black border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col items-center text-center gap-8 md:flex-row md:items-start md:justify-between md:text-left">
            <div className="space-y-3 md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <img src="/logo.svg" alt="MovieFinder" className="h-8 w-auto" />
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                TMDB API 기반으로 영화 정보를 보여주는 개인 프로젝트입니다. API
                연동 / 검색 / 페이징 / 무한 스크롤 등을 구현하였습니다.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-white font-semibold text-sm">Explore</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      className="text-white/60 hover:text-white transition"
                      href="https://www.themoviedb.org/movie/now-playing"
                    >
                      Now Playing
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white/60 hover:text-white transition"
                      href="https://www.themoviedb.org/movie"
                    >
                      Popular
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white/60 hover:text-white transition"
                      href="https://www.themoviedb.org/movie/top-rated"
                    >
                      Top Rated
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-white font-semibold text-sm">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      className="text-white/60 hover:text-white transition"
                      href="https://www.themoviedb.org/about"
                      target="_blank"
                      rel="noreferrer"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white/60 hover:text-white transition"
                      href="https://developer.themoviedb.org/docs/getting-started"
                      target="_blank"
                      rel="noreferrer"
                    >
                      API Docs
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white/60 hover:text-white transition"
                      href="https://developer.themoviedb.org/docs/faq"
                      target="_blank"
                      rel="noreferrer"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-white font-semibold text-sm">Social</h3>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <a
                    href="https://github.com/jun6390"
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition"
                    aria-label="Github"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com/pxhxjxn"
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:joon6390@naver.com"
                    className="h-10 w-10 inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 flex flex-col items-center text-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:text-left border-t border-white/10 pt-6">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} MovieFinder. All rights reserved.
            </p>
            <p className="text-white/50 text-sm">
              Data provided by <span className="text-yellow-500">TMDB</span>.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating TOP button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="맨 위로"
        className={[
          "fixed bottom-6 right-6 z-50",
          "inline-flex items-center gap-2",
          "h-12 px-4 rounded-full",
          "border border-yellow-500/70 bg-white/10 text-white backdrop-blur shadow-lg",
          "hover:bg-white/20 transition",
          "focus:outline-none focus:ring-2 focus:ring-yellow-500/70",
          showTop
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-2",
        ].join(" ")}
      >
        <ArrowUp className="h-5 w-5" />
        <span className="text-sm font-semibold tracking-wide">TOP</span>
      </button>
    </>
  );
}
