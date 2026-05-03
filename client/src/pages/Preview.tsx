import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import ProjectPreview from "../components/ProjectPreview";
import { useSession } from "../lib/auth-client";
import type { Project, Version } from "../types";
import api from "../configs/axios";

const Preview = () => {
  const { projectId, versionId } = useParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = useSession();

  const fetchCode = async () => {
    try {
      const { data } = await api.get(`/api/project/preview/${projectId}`);
      setCode(data.project.current_code);

      if (versionId) {
        data.project.versions.forEach((version: Version) => {
          if (version.id === versionId) {
            setCode(version.code);
          }
        });
      }

      setLoading(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to load project code");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isPending && session?.user) {
      fetchCode();
    }
  }, [session, isPending]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="size-7 animate-spin text-indigo-200" />
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

export default Preview;
