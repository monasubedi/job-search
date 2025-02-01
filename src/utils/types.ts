export interface navItem {
  key: string;
  title: string;
  to: string;
}

export interface JobCategory {
  key: string;
  title: string;
  image: string;
}

export interface Job {
  employer_logo: string;
  employer_name: string;
  job_id: string;
  job_title: string;
  job_apply_link: string;
  job_city: string;
  job_country: string;
  job_state: string;
  job_description: string;
  job_employment_type: string;
  job_location?: string;
  job_posted_at_timestamp?: number;
  job_highlights?: {
    Qualifications: string[];
    Responsibilities: string[];
  };
}

export interface SearchParams {
  query: string;
  location_type?: string;
  employment_types?: string;
  job_requirements?: string;
}
