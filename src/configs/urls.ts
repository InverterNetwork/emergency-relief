const urls = {
  getOrganization: (id: string) => `organizations/${id}`,
  getOrganizationProjects: (ownerId: string) => `projects/owner/${ownerId}`,
  getOrganizations: `organizations`,
  getProject: (id: string) => `projects/${id}`,
  getProjects: `projects`,
  createTransaction: `transactions`,
};

export default urls;
