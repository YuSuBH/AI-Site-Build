import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import MyProjects from "./pages/MyProjects";
import Preview from "./pages/Preview";
import Community from "./pages/Community";
import View from "./pages/View";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import { useEffect, useRef } from "react";

const App = () => {
  const { pathname } = useLocation();

  const hideNavbar =
    (pathname.startsWith("/projects/") && pathname !== "/projects") ||
    pathname.startsWith("/view/") ||
    pathname.startsWith("/preview/");

  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (bgRef.current) {
        bgRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        bgRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div>
      <Toaster position="bottom-right" richColors />
      {!hideNavbar && <Navbar />}

      {/* CREATIVE CODED BACKGROUND */}
      <div
        ref={bgRef}
        className="fixed inset-0 -z-10 h-screen w-full bg-[#F5F5F5] overflow-hidden"
      >
        {/* Base Grid Background */}
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#BBD5DA_2px,transparent_2px)] bg-size-[24px_24px] opacity-100"></div>

        {/* Proximity Grid Background (Theme Accent) */}
        <div
          className="absolute inset-0 h-full w-full bg-[radial-gradient(#FF0000_2px,transparent_2px)] bg-size-[24px_24px] opacity-100"
          style={{
            WebkitMaskImage: `radial-gradient(150px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black, transparent)`,
            maskImage: `radial-gradient(150px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black, transparent)`,
          }}
        ></div>

        {/* Floating Code Elements */}
        <div className="absolute top-[20%] left-[15%] text-[#BBD5DA] opacity-30 font-mono text-3xl font-bold select-none rotate-12 animate-float">
          &lt;div&gt;
        </div>
        <div
          className="absolute top-[40%] right-[20%] text-[#FF0000] opacity-20 font-mono text-5xl font-bold select-none -rotate-12 animate-float"
          style={{ animationDelay: "1s" }}
        >
          {"{ }"}
        </div>
        <div
          className="absolute bottom-[30%] left-[10%] text-[#DFF1F1] opacity-60 font-mono text-4xl font-bold select-none -rotate-6 animate-float"
          style={{ animationDelay: "2s" }}
        >
          () =&gt;
        </div>
        <div
          className="absolute bottom-[20%] right-[15%] text-[#BBD5DA] opacity-40 font-mono text-2xl font-bold select-none rotate-45 animate-float"
          style={{ animationDelay: "3s" }}
        >
          &lt;/&gt;
        </div>
        <div
          className="absolute top-[10%] right-[40%] text-[#FF0000] opacity-10 font-mono text-6xl font-bold select-none rotate-3 animate-float"
          style={{ animationDelay: "4s" }}
        >
          if ()
        </div>
        <div
          className="absolute bottom-[40%] left-[40%] text-[#DFF1F1] opacity-50 font-mono text-xl font-bold select-none rotate-90 animate-float"
          style={{ animationDelay: "5s" }}
        >
          const
        </div>

        {/* Smooth fading overlay at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#F5F5F5] to-transparent"></div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/account/settings" element={<Settings />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/projects" element={<MyProjects />} />
        <Route path="/preview/:projectId" element={<Preview />} />
        <Route path="/preview/:projectId/:versionId" element={<Preview />} />
        <Route path="/community" element={<Community />} />
        <Route path="/view/:projectId" element={<View />} />
      </Routes>
    </div>
  );
};

export default App;
