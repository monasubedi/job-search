import {
  BookmarkAddedOutlined,
  BookmarkAddOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useJobContext } from "../../context/JobContext";
import useSaveJob from "../../hooks/useSaveJob";
import { Job } from "../../utils/types";
import "./job-card.css";

const JobCard = ({ job }: { job: Job }) => {
  const { jobIds } = useJobContext();

  const { handleSaveJob, handleUnSaveJob } = useSaveJob();

  return (
    <div className="jobCardContainer">
      <div className="jobCardWrapper">
        <Link
          style={{ display: "flex" }}
          to={`/job-detail/search?id=${job.job_id}&country=${job.job_country}`}
        >
          <div className="imgWrapper">
            {job.employer_logo && <img src={job.employer_logo} alt="logo" />}
          </div>

          <div className="jobCardDetail">
            <h1>
              {job.job_title.length > 30
                ? job.job_title.substring(0, 30).concat("...")
                : job.job_title}
            </h1>
            <p className="companyName">{job.employer_name}</p>
            <div className="detailFooter">
              <span className="jobType">{job.job_employment_type}</span>
              <span className="location">{job.job_location}</span>
            </div>
          </div>
        </Link>

        <button className="applyNowBtn">
          <a href={job.job_apply_link} target="_blank">
            Apply Now
          </a>
        </button>
        <div
          className="bookmarkIcon"
          onClick={() =>
            jobIds.includes(job.job_id)
              ? handleUnSaveJob(job.job_id)
              : handleSaveJob({
                  jobId: job.job_id,
                  title: job.job_title,
                  employmentType: job.job_employment_type,
                  applyLink: job.job_apply_link,
                  postedDate: job.job_posted_at_timestamp,
                })
          }
        >
          {jobIds.includes(job.job_id) ? (
            <BookmarkAddedOutlined />
          ) : (
            <BookmarkAddOutlined />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
