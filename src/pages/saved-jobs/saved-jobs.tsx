import { DeleteOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import useSaveJob from "../../hooks/useSaveJob";
import { SaveJob } from "../../utils/types";
import "./saved-jobs.css";
import useSavedJobs from "./useSavedJobs";

const SavedJobs = () => {
  const { getSavedJobsMutation } = useSavedJobs();
  const { handleUnSaveJob } = useSaveJob();
  return (
    <div className="savedJobsContainer">
      <div className="savedJobsWrapper">
        <h2>My Saved Job List</h2>
        {getSavedJobsMutation.isFetching ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Job Type</th>
                <th>Posted Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getSavedJobsMutation.data &&
                getSavedJobsMutation.data.data.map((d: SaveJob) => {
                  return (
                    <tr key={d.jobId}>
                      <td>{d?.title}</td>
                      <td>{d?.employmentType}</td>
                      <td>{new Date(d?.postedDate).toString()}</td>
                      <td
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <div onClick={() => handleUnSaveJob(d?.jobId)}>
                          <DeleteOutline className="del" />
                        </div>

                        <a href={d.applyLink} style={{ color: "blue" }}>
                          Apply Now
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
