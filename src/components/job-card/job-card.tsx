import { Bookmark } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Job } from "../../utils/types";
import "./job-card.css";

const JobCard = ({ job }: { job: Job }) => {
  return (
    <Link to={`/job-detail/search?id=${job.job_id}&country=${job.job_country}`}>
      <div className="jobCardContainer">
        <div className="jobCardWrapper">
          <div className="imgWrapper">
            <img src={job.employer_logo} alt="" />
          </div>

          <div className="jobCardDetail">
            <h1>
              {job.job_title.length > 35
                ? job.job_title.substring(0, 35).concat("...")
                : job.job_title}
            </h1>
            <p className="companyName">{job.employer_name}</p>
            <div className="detailFooter">
              <span className="jobType">{job.job_employment_type}</span>
              <span className="location">
                {job.job_state}, {job.job_city}
              </span>
            </div>
          </div>
          <button className="applyNowBtn">
            <a href={job.job_apply_link}>Apply Now</a>
          </button>
          <div className="bookmarkIcon">
            <Bookmark />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
