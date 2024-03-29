// @ts-check
import { readFileSync, appendFileSync, } from "fs";

/**
 * @param {import("child_process").ChildProcess} childProcess 
 * @returns {Promise<void>}
 */
function awaitChildProcess(childProcess) {
  return new Promise((resolve, _) => {

    childProcess.stdout?.on("data", (data) => {
      console.log(data);
    });

    childProcess.stderr?.on("data", (data) => {
      console.log(data);
    });
    
    childProcess.on("close", (code) => {
      resolve();
    });
  });
}

const functionInfoPath = "./function_info.json";

/**
 * @param {object} functionInfo 
 */
function saveFunctionInfo(functionInfo) {
  appendFileSync("./function_info.json", JSON.stringify(functionInfo, null, 2));
  console.log("Your function_info.json was created successfully!");
}

/**
 * @returns {object}
 */
function readFunctionInfo() {
  let rawData = readFileSync(functionInfoPath);
  let functionInfo = JSON.parse(rawData.toString());
  if (!functionInfo.overrides) functionInfo.overrides = {};
  return functionInfo;
}

export { saveFunctionInfo, readFunctionInfo, awaitChildProcess };