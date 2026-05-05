import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import ProjectPreview from "../components/ProjectPreview";
import type { Project } from "../types";
import api from "../configs/axios";

const View = () => {
  const { projectId } = useParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCode = async () => {
    try {
      const { data } = await api.get(`/api/project/published/${projectId}`);
      setCode(data.code);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to fetch project view");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCode();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="size-7 animate-spin text-black" />
      </div>
    );
  }

  return (
    <div className="h-screen">
      {code && (
        <ProjectPreview
          project={{ current_code: code } as Project}
          isGenerating={false}
          showEditorPanel={false}
        />
      )}
    </div>
  );
};

export default View;
