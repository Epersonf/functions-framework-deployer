// @ts-check
import { readFileSync, appendFileSync, } from "fs";

/**
 * @param {import("child_process").ChildProcess} childProcess 
 * @returns {Promise<void>}
 */
function awaitChildProcess(childProcess) {
  return new Promise((resolve, reject) => {
    childProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
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
  return functionInfo;
}

export { saveFunctionInfo, readFunctionInfo, awaitChildProcess };