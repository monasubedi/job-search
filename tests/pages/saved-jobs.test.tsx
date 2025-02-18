import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JobContextProvider } from "../../src/context/JobContext";
import useSaveJob from "../../src/hooks/useSaveJob";
import SavedJobs from "../../src/pages/saved-jobs/saved-jobs";
import useSavedJobs from "../../src/pages/saved-jobs/useSavedJobs";

vi.mock("../../src/pages/saved-jobs/useSavedJobs", async () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock("../../src/hooks/useSaveJob", async () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockGetSavedJobsMutation = {
  isFetching: false,
  data: {
    data: [
      {
        jobId: "1234",
        title: "React Developer",
        employmentType: "Full time",
        postedDate: 123334,
        applyLink: "https://example.com",
      },
    ],
  },
};

describe("SavedJobs", () => {
  beforeEach(() => {
    useSavedJobs.mockReturnValue({
      getSavedJobsMutation: mockGetSavedJobsMutation,
    });
    useSaveJob.mockReturnValue({
      handleUnSaveJob: vi.fn(),
    });
  });
  const renderComponent = () => {
    render(
      <JobContextProvider>
        <SavedJobs />
      </JobContextProvider>
    );
  };

  it("should render a list of saved job list", () => {
    renderComponent();
    const header = screen.getByRole("heading", { name: /saved job list/i });
    const title = screen.getByText(/react/i);
    const jobtype = screen.getByText(/full time/i);
    const applyLink = screen.getByRole("link");
    const delIcon = screen.getByTestId("DeleteOutlineIcon");
    const postedDate = new Date(123334).toString();
    const date = screen.getByText(postedDate);
    expect(header).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(jobtype).toBeInTheDocument();
    expect(applyLink).toHaveAttribute("href", "https://example.com");
    expect(date).toBeInTheDocument();
    expect(delIcon).toBeInTheDocument();
  });

  it("should return loading when the data is being fetched", () => {
    useSavedJobs.mockReturnValue({
      getSavedJobsMutation: { ...mockGetSavedJobsMutation, isFetching: true },
    });
    renderComponent();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should call unsave fun: when del icon is clicked", async () => {
    const { handleUnSaveJob } = useSaveJob();

    renderComponent();
    const delIcon = screen.getByTestId("DeleteOutlineIcon");
    const user = userEvent.setup();
    await user.click(delIcon);
    expect(handleUnSaveJob).toBeCalledWith("1234");
  });
});
