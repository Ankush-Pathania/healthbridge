export interface Employer {
  id: string;
  name: string;
  slug: string;
  description: string;
  location: {
    city: string;
    province: string;
    provinceCode: string;
  };
  website?: string;
  verified: boolean;
  activeJobCount: number;
  createdAt: string;
}
