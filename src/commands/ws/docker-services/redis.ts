import { DockerService } from "../../../types";

export const redis: DockerService = {
  image: 'redist:5.0.7',
  ports: [
    '6379:6379'
  ],
  volumes: [
    'redist:/data'
  ]
};