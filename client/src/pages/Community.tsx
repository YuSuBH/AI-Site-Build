import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Footer from "../components/Footer";
import api from "../configs/axios";

const Community = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/api/project/published");
      setProjects(data.projects);
      setLoading(false);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch community projects",
      );
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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
              <h1 className="text-2xl font-medium text-black">
                Published Projects
              </h1>
            </div>

            <div className="flex flex-wrap gap-3.5">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/view/${project.id}`}
                  target="_blank"
                  className="w-72 max-sm:mx-auto cursor-pointer bg-[#DFF1F1] border border-[#BBD5DA] rounded-lg overflow-hidden group hover:bg-[#FF0000]/80 hover:border-[#FF0000]/80 transition-all duration-300"
                >
                  {/* mini preview */}
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

                    <div className="flex justify-between items-center mt-6">
                      <span className="text-xs text-gray-500 group-hover:text-white/70">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>

                      <div className="flex gap-3 text-black text-sm">
                        <button className="px-3 py-1.5 bg-[#DFF1F1] hover:bg-white/15 rounded-md transition-colors flex items-center gap-2">
                          <span className="bg-gray-200 size-4.5 rounded-full text-black font-semibold flex items-center justify-center">
                            {project.user?.name?.slice(0, 1)}
                          </span>
                          {project.user?.name}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
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

export default Community;
