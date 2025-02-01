import { JobCategory, navItem } from "./types";

export const nav_items: navItem[] = [
  { key: "home", title: "Home", to: "/" },
  { key: "post-jobs", title: "Post jobs", to: "/post-jobs" },
  { key: "saved-jobs", title: "Saved jobs", to: "/saved-jobs" },
];

export const JOB_CATEGORIES: JobCategory[] = [
  { key: "01", title: "Design", image: "./assets/design.svg" },
  { key: "02", title: "Sales", image: "./assets/sales.svg" },
  { key: "03", title: "Marketing", image: "./assets/marketing.svg" },
  { key: "04", title: "Finance", image: "./assets/finance.svg" },
  { key: "05", title: "Technology", image: "./assets/technology.svg" },
  { key: "06", title: "Engineering", image: "./assets/engineering.svg" },
  { key: "07", title: "Business", image: "./assets/business.svg" },
  { key: "08", title: "Human Resource", image: "./assets/human_resource.svg" },
];

export const JOB_TYPES = [
  { key: "FULLTIME", value: "Full time" },
  { key: "PARTTIME", value: "Part time" },
  { key: "INTERN", value: "Internship" },
  { key: "CONTRACTOR", value: "Contract" },
];

export const CATEGORIES = [
  { key: "design", value: "Design" },
  { key: "sales", value: "Sales" },
  { key: "marketing", value: "Marketing" },
  { key: "finance", value: "Finance" },
  { key: "technology", value: "Technology" },
  { key: "engineering", value: "Engineering" },
  { key: "business", value: "Business" },
  { key: "resource", value: "Human Resource" },
];

export const JOB_LEVELS = [
  { key: "no_degree", value: "No Degree" },
  { key: "no_experience", value: "Entry Level" },
  { key: "under_3_years_experience", value: "Junior Level" },
  { key: "more_than_3_years_experience", value: "Mid Level" },
];

export const SALARY_RANGE = [
  { key: "$5-$100", value: "$5-$100" },
  { key: "$100-$1000", value: "$100-$1000" },
  { key: "$1000-$5000", value: "$1000-$5000" },
  { key: "$5000-above", value: "$5000-above" },
];
