import { DockerService } from "../../../types";

export const elasticsearch: DockerService = {
  image: 'elasticsearch:6.4.3',
  ports: [
    '9200:9200'
  ],
  volumes: [
    'elasticsearch:/usr/share/elasticsearch/data'
  ]
}