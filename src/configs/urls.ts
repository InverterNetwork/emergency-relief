const urls = {
  getOrganization: (id: string) => `organizations/${id}`,
  getOrganizationProjects: (ownerId: string) => `projects/owner/${ownerId}`,
  getOrganizations: `organizations`,
  getProject: (slug: string) => `projects/slug/${slug}`,
  getProjects: `projects`,
  createTransaction: `transactions`,
  getTransactionsByProjectId: (projectId: number) =>
    `transactions/project/${projectId}`,
};

export default urls;
