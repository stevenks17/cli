import { DockerComposeConfig, WorkstationConfiguration } from "../../../types";
import * as dockerServices from './../docker-services';

function getName(gitUrl: string): string {
  const matches = gitUrl.match(/\/(?<name>.+).git/);

  return matches?.groups?.name;
}

function servicesFromRepos(config: WorkstationConfiguration) {
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
        `/app:${config.root}/${name}`
      ]
    };

    return res;
  }, {})
}

function predefinedServices(config: WorkstationConfiguration) {
  return config.services.reduce((res, service) => {
    res.services[service] = dockerServices[service];
    res.volumes[service] = {};
    return res;
  }, {
    services: {},
    volumes: {}
  });
}

export function createCompose(config: WorkstationConfiguration) {
  const compose: DockerComposeConfig = {
    version: '3.7'
  };

  const repoServices = servicesFromRepos(config);
  const dockerServices = predefinedServices(config);

  return {
    ...compose,
    services: {
      ...repoServices,
      ...dockerServices.services
    },
    volumes: {
      ...dockerServices.volumes
    }
  };
}