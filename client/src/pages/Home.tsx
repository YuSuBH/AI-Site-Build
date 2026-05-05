import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { useSession } from "../lib/auth-client";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import api from "../configs/axios";

const Home = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const navigate = useNavigate();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!session?.user) {
        toast.error("Please sign in to create a project");
        return;
      } else if (!input.trim()) {
        toast.error("Please enter a message");
        return;
      }

      setLoading(true);

      const { data } = await api.post("/api/user/project", {
        initialPrompt: input,
      });

      setLoading(false);
      navigate(`/projects/${data.projectId}`);
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create project",
      );
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col items-center text-black text-sm pb-20 px-4 font-poppins">
      <Link
        to="/pricing"
        className="flex items-center gap-2 border border-[#BBD5DA] rounded-full p-1 pr-3 text-sm mt-20"
      >
        <span className="bg-[#FF0000] text-xs px-3 py-1 rounded-full">
          NEW
        </span>
        <p className="flex items-center gap-2">
          <span>Try 30 days free trial option</span>
          <svg
            className="mt-px"
            width="6"
            height="9"
            viewBox="0 0 6 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m1 1 4 3.5L1 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
      </Link>

      <h1 className="text-center text-[40px] leading-[48px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-3xl">
        Turn thoughts into websites instantly, with AI.
      </h1>

      <p className="text-center text-base max-w-md mt-2">
        Create, customize and publish faster than ever with intelligent design
        powered by AI.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="bg-[#DFF1F1] max-w-2xl w-full rounded-xl p-4 mt-10 border border-[#FF0000]/70 focus-within:ring-2 ring-[#FF0000] transition-all"
      >
        <textarea
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none text-gray-700 resize-none w-full"
          rows={4}
          placeholder="Describe your website in details"
          required
        />
        <button className="ml-auto flex items-center gap-2 bg-linear-to-r from-[#CB52D4] to-[#FF0000] rounded-md px-4 py-2">
          {!loading ? (
            "Create with AI"
          ) : (
            <>
              {" "}
              Creating{" "}
              <Loader2Icon className="animate-spin size-4 text-black" />
            </>
          )}
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-16 md:gap-20 mx-auto mt-16">
        <img
          className="max-w-28 md:max-w-32"
          src="https://saasly.prebuiltui.com/assets/companies-logo/framer.svg"
          alt=""
        />
        <img
          className="max-w-28 md:max-w-32"
          src="https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg"
          alt=""
        />
        <img
          className="max-w-28 md:max-w-32"
          src="https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg"
          alt=""
        />
        <img
          className="max-w-28 md:max-w-32"
          src="https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg"
          alt=""
        />
        <img
          className="max-w-28 md:max-w-32"
          src="https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg"
          alt=""
        />
      </div>
    </section>
  );
};

export default Home;
