import { DockerService } from "../../../types";

export const postgres: DockerService = {
  image: 'postgres:11.6',
  ports: [
    '5432:5432'
  ],
  volumes: [
    'postgres:/var/lib/postgresql/data'
  ]
};