import Hero from "../../components/hero/hero";
import JobCategories from "../../components/job-categories/job-categories";
import "./home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <h2>Home</h2>
      <Hero />
      <JobCategories />
    </div>
  );
};

export default Home;
