import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useJobContext } from "../context/JobContext";
import { saveJob, unSaveJob } from "../services";
import { getUserData } from "../utils/api";
import { SaveJob } from "../utils/types";

const useSaveJob = () => {
  const { jobIds, setJobIds } = useJobContext();
  const onSuccess = (data, status) => {
    toast.success(data.message);
    if (status === "delete") {
      setJobIds([...jobIds.filter((job) => job !== data.data)]);
    } else {
      setJobIds([...jobIds, data.data]);
    }
  };
  const onError = (message: string) => {
    toast.error(message);
  };

  const saveJobMutation = useMutation({
    mutationKey: ["save-job"],
    mutationFn: (formData: SaveJob) => saveJob(formData),
    onSuccess: (data) => onSuccess(data, ""),
    onError: (data) => onError(data.message),
  });

  const unSaveJobMutation = useMutation({
    mutationKey: ["unsave-job"],
    mutationFn: (jobId: string) => unSaveJob(jobId),
    onSuccess: (data) => onSuccess(data, "delete"),
    onError: (data) => onError(data.message),
  });

  const handleSaveJob = (data: SaveJob) => {
    const user = getUserData();
    if (!user) {
      toast.info("You must first log in to save this job!");
      return;
    }

    saveJobMutation.mutate(data);
  };

  const handleUnSaveJob = (jobId: string) => {
    const user = getUserData();
    if (!user) {
      toast.info("You must first log in to unsave this job!");
      return;
    }

    unSaveJobMutation.mutate(jobId);
  };

  return {
    handleSaveJob,
    handleUnSaveJob,
  };
};

export default useSaveJob;
