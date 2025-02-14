import {
  BookmarkAddedOutlined,
  BookmarkAddOutlined,
} from "@mui/icons-material";
import { useJobContext } from "../../context/JobContext";
import useSaveJob from "../../hooks/useSaveJob";
import JobDetailSkeleton from "../../skeletons/JobDetailSkeleton";
import "./job-detail.css";
import useJobDetail from "./useJobDetail";

const JobDetail = () => {
  const { jobDetail, isLoading } = useJobDetail();
  const { handleSaveJob, handleUnSaveJob } = useSaveJob();
  const { jobIds } = useJobContext();
  return isLoading || !jobDetail ? (
    <div>
      <JobDetailSkeleton />
    </div>
  ) : (
    <div className="jobDetailContainer">
      <div className="jobDetailWrapper">
        <div className="companyWrapper">
          <div className="company">
            <img
              src={jobDetail?.employer_logo}
              alt="logo"
              className="company-logo"
            />
            <div className="company-data">
              <h3>{jobDetail?.employer_name}</h3>
              <a href={jobDetail?.employer_website}>
                <small className="link">Visit Company</small>
              </a>
            </div>
          </div>
          <div className="company-right">
            <button className="btn">
              <a href={jobDetail?.job_apply_link}>Apply</a>
            </button>

            <div
              onClick={() =>
                jobIds?.includes(jobDetail?.job_id)
                  ? handleUnSaveJob(jobDetail.job_id)
                  : handleSaveJob({
                      jobId: jobDetail.job_id,
                      title: jobDetail.job_title,
                      employmentType: jobDetail.job_employment_type,
                      applyLink: jobDetail.job_apply_link,
                      postedDate: jobDetail.job_posted_at_timestamp,
                    })
              }
            >
              {jobIds.includes(jobDetail.job_id) ? (
                <BookmarkAddedOutlined />
              ) : (
                <BookmarkAddOutlined />
              )}
            </div>
          </div>
        </div>
        <div className="about-position">
          <div className="about-position-wrapper">
            <h3>{jobDetail?.job_title}</h3>
            <small>Basic Job Information</small>
            <div className="infoWrapper">
              <span className="label">Job Type</span>
              <span className="value">: {jobDetail?.job_employment_type}</span>
            </div>
            <div className="infoWrapper">
              <span className="label">Location</span>
              <span className="value">: {jobDetail?.job_location}</span>
            </div>
            <div className="infoWrapper">
              <span className="label">Job Posted At</span>
              <span className="value">
                :{" "}
                {jobDetail?.job_posted_at_timestamp &&
                  new Date(jobDetail?.job_posted_at_timestamp).toUTCString()}
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
                jobDetail?.job_highlights?.Responsibilities?.map(
                  (res: string) => <li key={res}>- {res}</li>
                )}
            </ul>
          </div>
          <div className="btns">
            <button className="applyNow">
              {" "}
              <a href={jobDetail?.job_apply_link}>Apply Now</a>
            </button>
            <button
              onClick={() =>
                jobIds?.includes(jobDetail?.job_id)
                  ? handleUnSaveJob(jobDetail.job_id)
                  : handleSaveJob({
                      jobId: jobDetail.job_id,
                      title: jobDetail.job_title,
                      employmentType: jobDetail.job_employment_type,
                      applyLink: jobDetail.job_apply_link,
                      postedDate: jobDetail.job_posted_at_timestamp,
                    })
              }
              className="saveJob"
            >
              {jobIds?.includes(jobDetail?.job_id) ? "SAVED" : "Save Job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
