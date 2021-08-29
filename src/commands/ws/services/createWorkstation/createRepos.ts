import { run } from 'ajc-util';

export async function createRepos(config: WorkstationConfiguration): Promise<any> {
  if (!config.repos) {
    return;
  }

  console.log('Cloning repos');
  return config.repos.reduce((tail, repInfo) => {
    const command = repInfo.init.split(' ');
    return tail
      .then(() => run('git', ['clone', repInfo.url], { cwd: config.root }))
      .then(() => run(command[0], command.slice(1), { cwd: config.root }));
  }, Promise.resolve() as Promise<any>);
}