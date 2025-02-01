import { BookmarkAddOutlined } from "@mui/icons-material";
import JobDetailSkeleton from "../../skeletons/JobDetailSkeleton";
import "./job-detail.css";
import useJobDetail from "./useJobDetail";

const JobDetail = () => {
  const { jobDetail, isLoading } = useJobDetail();
  return isLoading ? (
    <div>
      <JobDetailSkeleton />
    </div>
  ) : (
    <div className="jobDetailContainer">
      <div className="jobDetailWrapper">
        <div className="companyWrapper">
          <div className="company">
            <img src="" alt="logo" className="company-logo" />
            <div className="company-data">
              <h3>{jobDetail?.employer_name}</h3>
              <p>IT company</p>
              <span>33+ jobs</span>
            </div>
          </div>
          <div className="company-right">
            <button className="btn">
              <a href={jobDetail?.job_apply_link}>Apply</a>
            </button>
            <BookmarkAddOutlined />
          </div>
        </div>
        <div className="about-position">
          <div className="about-position-wrapper">
            <h3>{jobDetail?.job_title}</h3>
            <small>Basic Job Information</small>
            {/* <div className="infoWrapper">
              <p className="label">Job Category</p>
              <p className="value">:IT(Software)</p>
            </div>
            <div className="infoWrapper">
              <span className="label">Job level</span>
              <span className="value">:Senior (2+ years)</span>
            </div> */}
            {/* <div className="infoWrapper">
              <span className="label">Job Category</span>
              <span className="value">:IT(Software)</span>
            </div> */}
            {/* <div className="infoWrapper">
              <span className="label">No. of vacancy</span>
              <span className="value">:[6]</span>
            </div> */}
            <div className="infoWrapper">
              <span className="label">Job Type</span>
              <span className="value">:{jobDetail?.job_employment_type}</span>
            </div>
            <div className="infoWrapper">
              <span className="label">Location</span>
              <span className="value">:{jobDetail?.job_location}</span>
            </div>
            <div className="infoWrapper">
              <span className="label">Job Posted At</span>
              <span className="value">
                {jobDetail?.job_posted_at_timestamp &&
                  new Date(jobDetail?.job_posted_at_timestamp).toISOString()}
              </span>
            </div>
          </div>
        </div>
        <div className="job-description">
          <div className="descriptionWrapper">
            <h3>Job Description</h3>
            <p>{jobDetail?.job_description}</p>
          </div>
          <div className="requirements">
            <h3>Qualifications:</h3>
            <ul>
              {jobDetail?.job_highlights &&
                jobDetail?.job_highlights?.Qualifications &&
                jobDetail?.job_highlights?.Qualifications.map(
                  (qualification: string) => (
                    <li key={qualification}>- {qualification}</li>
                  )
                )}
            </ul>
          </div>
          <div className="otherSkills">
            <h3>Responsibilities:</h3>
            <ul>
              {jobDetail?.job_highlights &&
                jobDetail?.job_highlights?.Qualifications.map((res: string) => (
                  <li key={res}>- {res}</li>
                ))}
            </ul>
          </div>
          <div className="btns">
            <button className="applyNow">
              {" "}
              <a href={jobDetail?.job_apply_link}>Apply Now</a>
            </button>
            <button className="saveJob">Save Job</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
