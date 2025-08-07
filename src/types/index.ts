//A type for user Profile

export interface UserProfile {
  userId: string;
  position: string;
  company: string;
  companyLocation: string;
  bio: string;
  portfolioUrl?: string;
}
