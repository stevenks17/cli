import {createTemplateData} from "./createTemplateData";
import {readFileSync} from "fs";
import {rootDir} from "../../../../config";
import {render} from "ejs";

export async function createDockerCompose(config: WorkstationConfiguration) {
    const data = createTemplateData(config);
    const template = readFileSync(`${rootDir}/../templates/docker-compose.ts.ejs`, 'utf-8');
    return render(template, data);
}