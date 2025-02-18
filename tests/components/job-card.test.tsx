import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import JobCard from "../../src/components/job-card/job-card";
import { AuthContextProvider } from "../../src/context/AuthContext";
import {
  JobContextProvider,
  useJobContext,
} from "../../src/context/JobContext";
import useSaveJob from "../../src/hooks/useSaveJob";
import { job } from "../utils";

vi.mock("../../src/context/JobContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useJobContext: vi.fn(),
  };
});

vi.mock("../../src/hooks/useSaveJob", () => ({
  default: vi.fn().mockReturnValue({
    handleSaveJob: vi.fn(),
    handleUnSaveJob: vi.fn(),
  }),
}));

describe("JobCard", () => {
  const renderComponent = () => {
    render(
      <MemoryRouter>
        <AuthContextProvider>
          <JobContextProvider>
            <JobCard job={job} />
          </JobContextProvider>
        </AuthContextProvider>
      </MemoryRouter>
    );
  };

  it("should render job details correctly", async () => {
    (useJobContext as any).mockReturnValue({
      jobIds: ["12345"],
    });
    renderComponent();
    const title = screen.getByText(/react developer/i);
    const employer_name = screen.getByText(/meta/i);
    const employment_type = screen.getByText(/full time/i);
    const job_location = screen.getByText(/IA, USA/i);
    const logo = screen.getByRole("img");
    const link = screen.getByRole("link", { name: /apply now/i });
    const saveBtn = screen.getByTestId("BookmarkAddOutlinedIcon");

    expect(title).toBeInTheDocument();
    expect(employer_name).toBeInTheDocument();
    expect(employment_type).toBeInTheDocument();
    expect(job_location).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      "src",
      "https://www.jsonplaceholder.com/images/120x120"
    );
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://");
    expect(saveBtn).toBeInTheDocument();
  });

  it("should call savejob fun: when save btn is clicked", async () => {
    (useJobContext as any).mockReturnValue({
      jobIds: ["12345"],
    });
    const { handleSaveJob } = useSaveJob();

    renderComponent();
    const saveBtn = screen.getByTestId("BookmarkAddOutlinedIcon");
    const user = userEvent.setup();
    await user.click(saveBtn);
    expect(handleSaveJob).toBeCalled();
  });
  it("should call unsave job fun: when saved btn is clicked", async () => {
    (useJobContext as any).mockReturnValue({
      jobIds: ["1234"],
    });
    const { handleUnSaveJob } = useSaveJob();

    renderComponent();
    const saveBtn = screen.getByTestId("BookmarkAddedOutlinedIcon");
    const user = userEvent.setup();
    await user.click(saveBtn);
    expect(handleUnSaveJob).toBeCalled();
  });
  it("should link to detail page when the card is clicked", async () => {
    renderComponent();
    const card = screen.getByTestId("jobDetail");
    const link = screen.getByTestId("detailLink");
    const user = userEvent.setup();
    await user.click(card);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "/job-detail/search?id=1234&country=USA"
    );
  });
});
