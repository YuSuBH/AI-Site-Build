import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../lib/auth-client";
import { toast } from "sonner";
import Footer from "../components/Footer";
import api from "../configs/axios";

const MyProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();

  const fetchProjects = async () => {
    try {
      const { data } = await api.get(`/api/user/projects`);

      setProjects(data.projects);
      setLoading(false);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch projects",
      );
      console.log(error);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this project?",
      );
      if (!confirm) return;

      const { data } = await api.delete(`/api/project/${projectId}`);

      toast.success(data.message || "Project deleted successfully");
      fetchProjects();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete project",
      );
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user && !isPending) {
      fetchProjects();
    } else if (!isPending && !session?.user) {
      toast.error("Please login to view your projects");
      navigate("/");
    }
  }, [session, isPending]);

  return (
    <>
      <div className="px-4 md:px-16 lg:px-24 xl:px-32">
        {loading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader2Icon className="size-7 animate-spin text-black" />
          </div>
        ) : projects.length > 0 ? (
          <div className="py-10 min-h-[80vh]">
            <div className="flex items-center justify-between mb-12">
              <h1 className="text-2xl font-medium text-black">My Projects</h1>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-white px-3 sm:px-6 py-1 sm:py-2 rounded bg-[#FF0000] hover:opacity-90 active:scale-95 transition-all"
              >
                <PlusIcon size={18} />
                Create New
              </button>
            </div>

            <div className="flex flex-wrap gap-3.5">
              {projects.map((project) => (
                <div
                  onClick={() => navigate(`/projects/${project.id}`)}
                  key={project.id}
                  className="relative group w-72 max-sm:mx-auto cursor-pointer bg-[#DFF1F1] border border-[#BBD5DA] rounded-lg overflow-hidden shadow-md group hover:bg-[#FF0000]/80 hover:shadow-[#FF0000]/30 hover:border-[#FF0000]/80 transition-all duration-300"
                >
                  <div className="relative w-full h-40 bg-[#F5F5F5] overflow-hidden border-b border-[#BBD5DA]">
                    {project.current_code ? (
                      <iframe
                        srcDoc={project.current_code}
                        className="absolute top-0 left-0 w-[1200px] h-[800px] origin-top-left pointer-events-none"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ transform: "scale(0.25)" }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <p>No Preview</p>
                      </div>
                    )}
                  </div>

                  {/* content */}
                  <div className="p-4 text-black group-hover:text-white transition-colors">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium line-clamp-2">
                        {project.name}
                      </h2>
                      <button className="px-2.5 py-0.5 mt-1 ml-2 text-xs bg-[#DFF1F1] border border-[#BBD5DA] rounded-full text-gray-800 group-hover:text-gray-900 group-hover:bg-white group-hover:border-transparent">
                        Website
                      </button>
                    </div>
                    <p className="text-gray-600 group-hover:text-white/80 mt-1 text-sm line-clamp-2">
                      {project.initial_prompt}
                    </p>

                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex justify-between items-center mt-6"
                    >
                      <span className="text-xs text-gray-500 group-hover:text-white/70">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>

                      <div className="flex gap-3 text-black text-sm">
                        <button
                          onClick={() => navigate(`/preview/${project.id}`)}
                          className="px-3 py-1.5 bg-[#DFF1F1] hover:bg-white/15 rounded-md transition-all"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => navigate(`/projects/${project.id}`)}
                          className="px-3 py-1.5 bg-[#DFF1F1] hover:bg-white/15 rounded-md transition-colors"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <TrashIcon
                      onClick={() => deleteProject(project.id)}
                      className="absolute top-3 right-3 scale-0 group-hover:scale-100 bg-white p-1.5 size-7 rounded text-red-500 text-xl cursor-pointer transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <h1 className="text-3xl font-semibold text-gray-700">
              You have no projects yet!
            </h1>
            <button
              onClick={() => navigate("/")}
              className="text-black px-5 py-2 mt-5 rounded-md bg-[#FF0000] hover:bg-[#FF0000] active:scale-95 transition-all"
            >
              Create New
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyProjects;
