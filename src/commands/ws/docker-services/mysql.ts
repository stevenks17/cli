import { DockerService } from "../../../types";

export const mysql: DockerService = {
  image: 'mysql:8',
  ports: [
    '3306:3306'
  ],
  volumes: [
    'mysql:/var/lib/mysql'
  ]
}