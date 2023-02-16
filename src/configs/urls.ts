const urls = {
  getOrganization: (id: string) => `get-organization?id=${id}`,
  getOrganizationProjects: (id: string) =>
    `get-organization-projects?organization-id=${id}`,
  getOrganizations: `get-organizations`,
  getProject: (id: string) => `get-project?id=${id}`,
  getProjects: `get-projects`,
};

export default urls;
