import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { JobContextProvider } from "../../src/context/JobContext";
import useSearchJobs from "../../src/hooks/useSearchJobs";
import JobList from "../../src/pages/job-list/job-list";
import { Job } from "../../src/utils/types";
import { job } from "../utils";

vi.mock("../../src/pages/job-list/useJobList", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    handleCategoryChange: vi.fn(),
    handleJobLevelChange: vi.fn(),
    handleJobTypeChange: vi.fn(),
  };
});
vi.mock("../../src/hooks/useSearchJobs", () => ({
  default: vi.fn(),
}));
vi.mock("../../src/components/job-card/job-card", () => ({
  default: vi.fn(({ job }: { job: Job }) => (
    <div data-testid={job.job_id}>{job.job_title}</div>
  )),
}));

describe("JobList", () => {
  const jobs = [{ ...job }];
  beforeEach(() => {
    useSearchJobs.mockReturnValue({
      searchJobs: vi.fn(),
      jobList: jobs,
      isLoading: false,
    });
  });
  const renderComponent = () => {
    render(
      <MemoryRouter>
        <JobContextProvider>
          <JobList />
        </JobContextProvider>
      </MemoryRouter>
    );
  };

  it("should render skeleton loading while data is being fetched", () => {
    useSearchJobs.mockReturnValue({
      searchJobs: vi.fn(),
      jobList: [],
      isLoading: true,
    });
    renderComponent();
    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });
  it("should render no result when data is empty after being fetched", () => {
    useSearchJobs.mockReturnValue({
      searchJobs: vi.fn(),
      jobList: [],
      isLoading: false,
    });
    renderComponent();
    const noResult = screen.getByText(/no result/i);
    expect(noResult).toBeInTheDocument();
  });
  it("should render a job list after data is being fetched", () => {
    renderComponent();

    jobs.forEach((j) => {
      expect(screen.getByTestId(j.job_id)).toBeInTheDocument();
      expect(screen.getByTestId(j.job_id)).toHaveTextContent(j.job_title);
    });
  });
});
