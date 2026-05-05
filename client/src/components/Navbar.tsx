import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import api from "../configs/axios";
import { useSession, signOut } from "../lib/auth-client";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const [credits, setCredits] = useState(0);
  const { data: session, isPending } = useSession();

  const getCredits = async () => {
    try {
      const { data } = await api.get("/api/user/credits");
      setCredits(data.credits);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      getCredits();
    }
  }, [session?.user]);

  return (
    <>
      <nav className="z-50 flex items-center justify-between w-full py-4 px-4 md:px-16 lg:px-24 xl:px-32 backdrop-blur border-b text-black border-[#BBD5DA]">
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h- sm:h-7" />
          <span className="font-bold text-lg">OneCon</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <Link to="/">Home</Link>
          <Link to="/projects">My Projects</Link>
          <Link to="/community">Community</Link>
          <Link to="/pricing">Pricing</Link>
        </div>

        <div className="flex items-center gap-3">
          {session?.user && (
            <div className="hidden sm:flex items-center gap-1.5 bg-[#FF0000]/10 px-3 py-1.5 rounded-full border border-[#FF0000]/20 text-[#FF0000] font-medium text-sm">
              <span className="font-bold text-black">{credits}</span> Credits
            </div>
          )}

          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-[#DFF1F1] animate-pulse"></div>
          ) : session ? (
            <div className="relative group">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF0000] text-white font-semibold transition-colors">
                {session.user.name?.charAt(0).toUpperCase() ||
                  session.user.email.charAt(0).toUpperCase()}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-[#F5F5F5] border border-[#BBD5DA] rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-2 border-b border-[#BBD5DA]">
                  <p className="text-sm font-medium text-black truncate">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {session.user.email}
                  </p>
                </div>
                <Link
                  to="/account/settings"
                  className="block px-4 py-2 text-sm text-slate-300 hover:bg-[#DFF1F1] hover:text-black"
                >
                  Settings
                </Link>
                <button
                  onClick={async () => {
                    await signOut();
                    navigate("/");
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#DFF1F1] hover:text-red-300"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="px-6 py-1.5 max-sm:text-sm bg-[#FF0000] active:scale-95 hover:bg-red-700 text-white transition rounded"
            >
              Get started
            </button>
          )}
          <button
            id="open-menu"
            className="md:hidden active:scale-90 transition"
            onClick={() => setMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-100 bg-[#F5F5F5]/60 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)}>
            Projects
          </Link>
          <Link to="/community" onClick={() => setMenuOpen(false)}>
            Community
          </Link>
          <Link to="/pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>

          <button
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* BACKGROUND IMAGE */}
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/hero/bg-gradient-2.png"
        className="absolute inset-0 -z-10 size-full opacity"
        alt=""
      />
    </>
  );
};

export default Navbar;
