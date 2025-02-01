import Hero from "../../components/hero/hero";
import JobCategories from "../../components/job-categories/job-categories";
import "./home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <Hero />
      <JobCategories />
    </div>
  );
};

export default Home;
