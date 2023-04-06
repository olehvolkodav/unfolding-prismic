// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
export const apiEndpoint = 'https://unfolding-word.cdn.prismic.io/api/v2'

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = 'MC5ZY0lUYVJJQUFDd0FTYVAx.77-9DmdAB--_vQMq77-9Xe-_ve-_ve-_vRJOW03vv71c77-977-9EG3vv70MWyzvv70QZu-_vXg'

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (data, documents = null, projects = null) => {
  if (data.type === 'page') {
    let url = `/${data.uid}`;
    if (documents) {
      const linkDoc = documents.find(doc => doc.id === data.id);
      if (linkDoc.data.url_prefix)
        url = `/${linkDoc.data.url_prefix}${url}`;
    }
    return url;
  }
  if (data.type === "projects" || data.type === "region") {
    let url = `/${data.uid}`;
    if (projects) {
      const linkProject = projects.find(project => project.id === data.id);
      if (linkProject && linkProject.data?.region_link?.uid) {
        url = `/projects/${linkProject.data?.region_link?.uid}${url}`;
      }
      else {
        url = `/projects${url}`;
      }
    }
    return url;
  }

  return data.url.indexOf("#") === 8 ? data.url.substr(8) : data.url;
}

// Additional helper function for Next/Link component
export const hrefResolver = (doc) => {
  if (doc.type === 'page') {
    return '/[uid]'
  }
  return '/'
}