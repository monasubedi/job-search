import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  JobContextProvider,
  useJobContext,
} from "../../src/context/JobContext";
import useSaveJob from "../../src/hooks/useSaveJob";
import JobDetail from "../../src/pages/job-detail/job-detail";
import useJobDetail from "../../src/pages/job-detail/useJobDetail";
import { job } from "../utils";

vi.mock("../../src/pages/job-detail/useJobDetail", () => ({
  default: vi.fn(),
}));

vi.mock("../../src/hooks/useSaveJob", () => ({
  default: vi.fn(),
}));

vi.mock("../../src/context/JobContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useJobContext: vi.fn(),
  };
});

describe("JobDetail", () => {
  beforeEach(() => {
    useJobDetail.mockReturnValue({
      jobDetail: { ...job },
      isLoading: false,
    });
    useSaveJob.mockReturnValue({
      handleSaveJob: vi.fn(),
      handleUnSaveJob: vi.fn(),
    });
    (useJobContext as any).mockReturnValue({
      jobIds: [],
    });
  });
  const renderComponent = () => {
    render(
      <JobContextProvider>
        <JobDetail />
      </JobContextProvider>
    );
  };

  it("should render skeleton loading when the data is being fetched", async () => {
    useJobDetail.mockReturnValue({
      jobDetail: { ...job },
      isLoading: true,
    });
    renderComponent();
    const loading = await screen.findByTestId("loading");

    expect(loading).toBeInTheDocument();
  });

  it("should render job detail information correctly", async () => {
    renderComponent();
    const logo = await screen.findByRole("img");
    const title = screen.getByRole("heading", { name: /react/i });
    const jobtype = screen.getByText(/full time/i);
    const applyLinks = screen.getAllByRole("link");
    const location = screen.getByText(new RegExp(job.job_location));
    const desc = screen.getByText(job.job_description);
    const saveBtn = screen.getByText(/save job/i);
    const qualifications = screen.getAllByRole("list");
    const responsibilities = screen.getAllByRole("list");

    job.job_highlights.Qualifications.forEach((q, i) =>
      expect(qualifications[i]).toBeInTheDocument()
    );

    job.job_highlights.Responsibilities.forEach((r, i) =>
      expect(responsibilities[i]).toBeInTheDocument()
    );

    const postedDate = new Date(job.job_posted_at_timestamp).toUTCString();

    const date = screen.getByText(new RegExp(postedDate));
    expect(logo).toHaveAttribute("src", job.employer_logo);
    expect(title).toBeInTheDocument();
    expect(jobtype).toBeInTheDocument();
    expect(applyLinks).toHaveLength(2);
    applyLinks.forEach((l) =>
      expect(l).toHaveAttribute("href", job.job_apply_link)
    );
    expect(location).toBeInTheDocument();
    expect(desc).toBeInTheDocument();

    expect(date).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
  });
  it("should show saved btn when there is job id", () => {
    (useJobContext as any).mockReturnValue({
      jobIds: [job.job_id],
    });
    renderComponent();
    const savedBtn = screen.getByText(/saved/i);
    expect(savedBtn).toBeInTheDocument();
  });
  it("should call save job api when save job btn is clicked", async () => {
    const { handleSaveJob } = useSaveJob();
    renderComponent();
    const saveBtn = screen.getByText(/save/i);
    const user = userEvent.setup();
    await user.click(saveBtn);
    expect(handleSaveJob).toBeCalled();
  });
  it("should call unsave job api when saved job btn is clicked", async () => {
    (useJobContext as any).mockReturnValue({
      jobIds: [job.job_id],
    });
    const { handleUnSaveJob } = useSaveJob();
    renderComponent();
    const savedBtn = screen.getByText(/saved/i);
    const user = userEvent.setup();
    await user.click(savedBtn);
    expect(handleUnSaveJob).toBeCalledWith(job.job_id);
  });
});
