import {createDockerCompose} from "./createDockerCompose";
import {expect} from "chai";

describe('createDockerCompose', () => {
  it('should console.log', async () => {
    const compose = await createDockerCompose({
      services: ['mysql']
    });

    expect(compose).to.equalIgnoreSpaces(`
      export default {
        "version": "3.7",
        "services": {
          "mysql": {
              "image": "mysql:8",
              "ports": ["3306:3306"],
              "volumes": ["mysql:/var/lib/mysql"],
            },
        }, 
        "volumes": {
          "mysql": {},
        }
      } as DockerComposeConfig
    `);
  });
});