import SearchBar from "../searchbar/searchbar";
import "./hero.css";

const Hero = () => {
  return (
    <section className="heroContainer">
      <div className="heroWrapper">
        <div>
          <h1>Your Dream</h1>
          <p className="heroText">Job is Waiting</p>
          <span className="jobsCount">5000+ Jobs</span>
          <SearchBar />
        </div>
        <div className="heroImgContainer">
          <img src="./assets/hero.svg" alt="hero-img" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
