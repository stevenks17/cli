import { render } from 'ejs';
import { readFileSync } from 'fs';

const template = readFileSync('./src/templates/docker-compose.ts.ejs', 'utf-8');
console.log(template);
const compiled = render(template, {
  services: {
    elasticsearch: {
      image: 'elasticsearch:6.4.3',
      ports: [
        '9200:9200'
      ],
      volumes: [
        'elasticsearch:/usr/share/elasticsearch/data'
      ]
    }
  },
  gitServices: {
    'ajg-cli': {
      command: 'yarn dev',
      image: 'node:14',
      ports: ['8000:8000']
    }
  },
  volumes: {
    mysql: {}
  }
})

console.log(compiled);