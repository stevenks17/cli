const environments = ['alpha', 'beta', 'staging', 'production'];

export function isRepoService(service: any): service is RepoService {
  return typeof service.image === 'function' && typeof service.command === 'function';
}

export function isValidEnvironment(environment: string) {
  return environments.includes(environment);
}

interface GenerateOptions {
  test: boolean
}

function processServices(env:string, services: DockerComposeConfig['services'], flag:GenerateOptions) {
  return Object.entries(services).reduce((res, [serviceName, serviceDef]) => {
    if(isRepoService(serviceDef)) {
      res[serviceName] = {
        ...serviceDef,
        command: serviceDef.command(env, flag),
        image: serviceDef.image(env)
      }
    } else {
      res[serviceName] = serviceDef;
    }
    
    return res;
  }, {})
}

export function generateDockerCompose(config:DockerComposeConfig, env:string, options:GenerateOptions): any {
  const services = processServices(env, config.services, options);
  return {
    ...config,
    services
  };
}
