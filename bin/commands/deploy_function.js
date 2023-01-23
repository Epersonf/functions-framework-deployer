// @ts-check

import { exec } from "child_process";
import { awaitChildProcess, readFunctionInfo } from "../utils.js";

const deployFunction = async () => {
  try {
    const stage = process.argv.find((arg) => arg.startsWith("--stage="))?.split("=")[1] || "dev";

    const ogFunctionInfo = readFunctionInfo();

    const functionInfo = {
      ...ogFunctionInfo,
      ...ogFunctionInfo.overrides[stage]
    };

    const command = `gcloud functions deploy ${functionInfo.name}
  --gen2
  --project=${functionInfo.project.replace("${stage}", stage)}
  --runtime=${functionInfo.runtime.replace("${stage}", stage)}
  --region=${functionInfo.region.replace("${stage}", stage)}
  --source=${functionInfo.source.replace("${stage}", stage)}
  --set-env-vars STAGE=${stage},PROJECT=${functionInfo.project}
  --entry-point=${functionInfo.handler}
  ${functionInfo.params.join(" ")}`.replace(/( +(?= ))|\n/g, " ").replace("${stage}", stage)

    console.log(`Deploying function ${functionInfo.name} with command: ${command}`);

    const childProcess = exec(command);

    awaitChildProcess(childProcess);
  } catch (e) {
    console.log("Invalid function_info.json, or no function_info.json found in the root of the project. Run the init command to generate a valid function_info.json.");
  }

}

export default deployFunction;