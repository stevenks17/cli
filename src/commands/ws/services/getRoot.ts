export function getRoot(config:WorkstationConfiguration): string {
  return `${process.cwd()}/${config.project}`;
}