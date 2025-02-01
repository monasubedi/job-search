import { ArrowRight } from "@mui/icons-material";
import { JOB_CATEGORIES } from "../../utils/constants";
import { JobCategory } from "../../utils/types";
import CategoryCard from "../category-card/category-card";
import "./job-categories.css";

const JobCategories = () => {
  return (
    <section className="categoriesContainer">
      <div className="categoriesWrapper">
        <div className="categoriesHeader">
          <h2>
            Explore by <span className="subText">categories</span>
          </h2>
          <div className="headerRight">
            <span>Show all jobs</span>
            <ArrowRight />
          </div>
        </div>
        <div className="categoriesBody">
          {JOB_CATEGORIES.map((cat: JobCategory) => {
            return <CategoryCard category={cat} key={cat.key} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
