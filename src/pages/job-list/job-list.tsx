import { ArrowDropDown } from "@mui/icons-material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import JobCard from "../../components/job-card/job-card";
import useSearchJobs from "../../hooks/useSearchJobs";
import JobCardSkeleton from "../../skeletons/JobCardSkeleton";
import { CATEGORIES, JOB_LEVELS, JOB_TYPES } from "../../utils/constants";
import { Job } from "../../utils/types";
import "./job-list.css";
import useJobList from "./useJobList";

const JobList = () => {
  const {
    jobType,
    category,
    jobLevel,
    handleCategoryChange,
    handleJobLevelChange,
    handleJobTypeChange,
  } = useJobList();

  const { searchJobs, jobList, isLoading } = useSearchJobs();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    const query = searchParams.get("query") || "";
    const location = searchParams.get("location") || "";

    await searchJobs({
      employment_types: jobType,
      job_requirements: jobLevel,
      query: category || query,
      country: location,
    });
  };

  return (
    <div className="jobListContainer">
      <div className="jobListWrapper">
        <div className="leftSideWrapper">
          <div className="left-side">
            <div className="jobTypes">
              <div className="typesHeader">
                <h3>Job Type</h3>
                <ArrowDropDown />
              </div>
              <div className="checkboxWrapper">
                {JOB_TYPES.map((type) => (
                  <div className="checkboxDiv" key={type.key}>
                    <input
                      checked={type.key === jobType}
                      type="checkbox"
                      value={type.key}
                      onChange={handleJobTypeChange}
                    />
                    <label>{type.value}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="jobCategories">
              <div className="typesHeader">
                <h3>Job Categories</h3>
                <ArrowDropDown />
              </div>
              <div className="checkboxWrapper">
                {CATEGORIES.map((cat) => (
                  <div className="checkboxDiv" key={cat.key}>
                    <input
                      checked={cat.key === category}
                      type="checkbox"
                      value={cat.key}
                      onChange={handleCategoryChange}
                    />
                    <label>{cat.value}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="jobLevels">
              <div className="typesHeader">
                <h3>Job Level</h3>
                <ArrowDropDown />
              </div>
              <div className="checkboxWrapper">
                {JOB_LEVELS.map((level) => (
                  <div className="checkboxDiv" key={level.key}>
                    <input
                      checked={level.key === jobLevel}
                      type="checkbox"
                      value={level.key}
                      onChange={handleJobLevelChange}
                    />
                    <label>{level.value}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="searchJobBtn">
              <button className="btn" onClick={handleSearch}>
                Search Jobs
              </button>
            </div>
          </div>
        </div>

        <div className="right-side">
          <h3>All Jobs</h3>
          {isLoading ? (
            <JobCardSkeleton />
          ) : !isLoading && jobList.length > 0 ? (
            jobList.map((job: Job) => <JobCard key={job.job_id} job={job} />)
          ) : !isLoading && jobList.length === 0 ? (
            <div>No Results.</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobList;
