import { ArrowRightOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { JobCategory } from "../../utils/types";
import "./category-card.css";

const CategoryCard = ({ category }: { category: JobCategory }) => {
  return (
    <Link to={`/job-list/search?query=${category.title}&country=US`}>
      <div className="cardContainer">
        <div className="cardWrapper">
          <img src={category.image} alt={category.title} />
          <p>{category.title}</p>
          <div className="cardFooter">
            <span className="footerText">265+ jobs available</span>
            <ArrowRightOutlined />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
