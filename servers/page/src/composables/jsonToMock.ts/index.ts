import { Options } from "./model";
import { isArray, isObject } from "./util";
import { getNames } from "./get-names";
import {
  getInterfaceDescriptions,
  getInterfaceStringFromDescription
} from "./get-interfaces";
import optimizeTypeStructureTree from './combinedData'

export default function JsonToTS(json: any, userOptions?: Options):any {
  const defaultOptions: Options = {
    rootName: "RootObject"
  };
  const options = {
    ...defaultOptions,
    ...userOptions
  };

  const isArrayOfObjects =
    isArray(json) &&
    json.length > 0 &&
    json.reduce((a, b) => a && isObject(b), true);

  if (!(isObject(json) || isArrayOfObjects)) {
    throw new Error("只 (Object) and (Array of Object) are supported");
  }

	const typeStructure = getTypeStructure(json);
	optimizeTypeStructure(typeStructure);
	const names = getNames(typeStructure, options.rootName);
	const descriptions  = getInterfaceDescriptions(typeStructure, names);
	console.log('optimizeTypeStructure2222', descriptions)
	// console.log('optimizeTypeStructure333', optimizeTypeStructureTree(descriptions))
  return optimizeTypeStructureTree(descriptions)
}
