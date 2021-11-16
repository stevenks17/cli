import dockerServices from "../dockerServices"

function getName(gitUrl: string): string | undefined {
  const matches = gitUrl.match(/\/(?<name>.+).git/);

  return matches?.groups?.name;
}

function servicesFromRepos(config: WorkstationConfiguration) {
  if (!config.repos) {
    return {};
  }

  const root = `${process.cwd()}/${config.project}`;

  return config.repos.reduce((res, repo) => {
    const name = getName(repo.url);

    if (!name) {
      throw new Error('Unable to parse name, is this a valid git repo?');
    }

    res[name] = {
      tty: true,
      command: 'yarn dev',
      image: 'nodejs:14',
      volumes: [
        `/app:${root}/${name}`
      ]
    };

    return res;
  }, {} as Dict<DockerService>)
}

function predefinedServices(config: WorkstationConfiguration) {
  if (!config.services) {
    return {};
  }

  return config.services.reduce((res, service) => {
    res.services = {
      ...res.services,
      [service]: dockerServices[service]
    };

    res.volumes = {
      ...res.volumes,
      [service]: {}
    };

    return res;
  }, {
    services: {},
    volumes: {}
  } as DockerComposeConfig);
}

export function createTemplateData(config: WorkstationConfiguration) {
  const repoServices = servicesFromRepos(config);
  const dockerServices = predefinedServices(config);

  return {
    version: '3.7',
    services: {
      ...dockerServices.services
    },
    repoServices: {
      ...repoServices,
    },
    volumes: {
      ...dockerServices.volumes
    }
  };
}