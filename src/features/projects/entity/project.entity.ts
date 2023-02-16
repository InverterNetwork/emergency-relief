export type Project = {
  name: 'Turkey Earthquake Relief Campaign';
  description: "Ahbap Association, founded by Haluk Levent in 2017, aims to provide all kinds of aid to people in need both in kind and in cash and to strengthen the awareness of cooperation in the society. They serve the building of good people and good society, create contemporary and sustainable networks of cooperation and solidarity with new cooperation models and projects, protect the local culture and to protect today's technological technologies. It was established with the aim of contributing to its development and moving to the future with its opportunities.";
  summary: 'A Turkey based non-profit organization established on the principles of solidarity and cooperation, founded by the Turkish musician and philanthropist, Haluk Levent.';
  website: 'https://ahbap.org/';
  social_profiles: SocialProfile[];
  donation_addresses: DonationAddress[];
  partners: Partner[];
  categories: string[];
  impact_location: 'Turkey';
  credentials: Credential[];
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
  reference: string;
};
