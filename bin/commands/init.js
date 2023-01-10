// @ts-check
import { createInterface } from 'readline';
import { saveFunctionInfo } from '../utils.js';

const init = async () => {

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const it = rl[Symbol.asyncIterator]();

  let template;

  while (true) {
    template = {
      "name": "my-first-function",
      "handler": "main",
      "region": "us-east1",
      "runtime": "nodejs16",
      "source": ".",
      "project": "my-first-project-dev",
      "params":  [
        "--trigger-http",
        "--allow-unauthenticated"
      ],
      "overrides": {
        "hml": {
          "project": "my-first-project-hml",
        },
        "prod": {
          "project": "my-first-project-prod",
        }
      }
    };

    console.log(`Type the name of your function: (${template["name"]})`);
    template.name = (await it.next()).value || template.name;

    console.log(`Type the handler of your function: (${template["handler"]})`);
    template.handler = (await it.next()).value || template.handler;

    console.log(`Type the region of your function: (${template["region"]})`);
    template.region = (await it.next()).value || template.region;

    console.log(`Type the runtime of your function: (${template["runtime"]})`);
    template.runtime = (await it.next()).value || template.runtime;

    console.log(`Type the source of your function: (${template["source"]})`);
    template.source = (await it.next()).value || template.source;

    console.log(`Type the default project of your function: (${template["project"]})`);
    template.project = (await it.next()).value || template.project;

    console.log(`Type the params of your function separated by " ": (${template["params"]})`);
    const params = (await it.next()).value;
    console.log(params);
    template.params = params ? params.split(" ") : template.params;

    console.log("Here is your function_info.json:");
    console.log(JSON.stringify(template, null, 2));
    console.log(`\nIs that correct? (y/n)`);

    const isCorrect = (await it.next()).value === "y";

    if (isCorrect) break;
    console.log(`\nLet's try again!`);
  }

  rl.close();

  saveFunctionInfo(template);

}

export default init;