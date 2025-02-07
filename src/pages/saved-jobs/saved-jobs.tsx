import { DeleteOutline } from "@mui/icons-material";
import "./saved-jobs.css";

const SavedJobs = () => {
  return (
    <div className="savedJobsContainer">
      <div className="savedJobsWrapper">
        <h2>My Saved Job List</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Job Type</th>
              <th>Posted Date</th>
              <th>Job Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((_, key) => (
              <tr key={key}>
                <td>UI/UX design</td>
                <td>Full Time</td>
                <td>01/01/2025</td>
                <td>Frontend Development</td>
                <td>
                  <DeleteOutline className="del" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedJobs;
