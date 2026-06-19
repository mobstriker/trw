export type ActivePage =
  | "home"
  | "residential"
  | "commercial"
  | "repair"
  | "storm"
  | "financing"
  | "gallery"
  | "reviews"
  | "careers"
  | "blog"
  | "about"
  | "contact"
  | "admin"; // Admin portal to view leads submitted to Express server!

export interface ServiceItem {
  name: string;
  description: string;
  features: string[];
}

export interface ServiceCategory {
  id: ActivePage;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  items: ServiceItem[];
}

export interface PricingTier {
  category: string;
  name: string;
  range: string;
  features: string[];
  unit?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  experience: string;
  specialty: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  readTime: string;
  date: string;
}

export interface JobPosition {
  title: string;
  department: string;
  type: string;
  location: string;
  benefits: string[];
  requirements: string[];
}

export interface LeadSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  service: string;
  notes: string;
  type: "inspection" | "emergency" | "career" | "contact" | "review";
  submittedAt?: string;
  status?: string;
}

export interface CustomerReview {
  name: string;
  location: string;
  stars: number;
  text: string;
  verified: boolean;
  date: string;
}

export interface ServiceCity {
  name: string;
  state: "NC" | "SC";
  responseRate: string;
  manager: string;
  coords: { x: number; y: number }; // Relative coordinates for our custom SVG visual grid map
}
