export interface navItem {
  key: string;
  title: string;
  to: string;
  protected: boolean;
  roles: Role[];
}

export enum Role {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_USER = "ROLE_USER",
  ROLE_EMPLOYER = "ROLE_EMPLOYER",
}

export interface UserDataType {
  userId: string;
  token: string;
  roles: Role[];
}

export interface JobCategory {
  key: string;
  title: string;
  image: string;
}

export interface Job {
  employer_logo: string;
  employer_name: string;
  employer_website?: string | null;
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
export interface SaveJob {
  jobId: string;
  title: string;
  employmentType: string;
  postedDate: number;
  applyLink: string;
}

export interface SearchParams {
  query: string;
  location_type?: string;
  employment_types?: string;
  job_requirements?: string;
}

export interface ApiResponse {
  statusCode: number;
  data: { userId: number; token: string };
  message: string;
}
