export type Project = {
  id: number;
  owner_id: number;
  name: string;
  description: string;
  summary: string;
  social_profiles: SocialProfile[];
  donation_addresses: DonationAddress[];
  partners: Partner[];
  categories: string[];
  impact_location: string;
  credentials: Credential[];
  logo_image_url: string | null;
  banner_image_url: string | null;
};

export type DonationAddress = {
  chain: string;
  address: string;
};

export type SocialProfile = {
  platform: string;
  link: string;
};

export type Partner = {
  name: string;
  website: string;
};

export type Credential = {
  statement: string;
  reference: string | null;
};
