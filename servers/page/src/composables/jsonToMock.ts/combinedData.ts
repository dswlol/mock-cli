import find from 'lodash-es/find';
import keys from 'lodash-es/keys'
import { InterfaceDescription } from "./model";
import {openAiNumber,openAiString,openAiDate,openAiBool} from './openAi'

let allInterfaceDescs:any[] = [];
function selfKeyValue(key: string, value: string,isArray:boolean): any{
	const targetEvent = find(allInterfaceDescs, { name: value });
	// console.log('find 2targetEvent',targetEvent,isArray)
  return optimizeTypeStructure(targetEvent, isArray,key)
}

function optimizeTypeStructure(interfaceDescs: InterfaceDescription, isArray: boolean, key: string) {
	const targetInfo: { [pname: string]: any } = {};

	keys(interfaceDescs.typeMap).forEach((item: any) => {
		const [key, value] = setFieldValue(item, interfaceDescs.typeMap?.[item]);
		targetInfo[key] = value;
	})
	return isArray ? [`${key}|3`, [targetInfo]] : [key, targetInfo];
}

function setFieldValue (key: string, value: string):any[]{
	let temp: any[] = []
	let tarKey = key.replace('?','')
	let tarVal = value;
	let isArray = false
	if (value.indexOf('[]') !== -1) {
		// 是否数组
		isArray = true;
		tarVal = value.replace('[]', '');
	}
	switch (tarVal) {
		case 'number':
			temp = openAiNumber(tarKey,isArray);
			break;
		case 'string':
			temp = openAiString(tarKey,isArray);
			break;
		case 'Date':
			temp = openAiDate(tarKey,isArray);
			break;
			case 'boolean':
				temp = openAiBool(tarKey,isArray);
			break;
		case 'function':
			temp = [tarKey,()=>{}];
			break;
		case 'any':
			temp = [tarKey,null];
			break;
		case 'undefined':
				temp = [tarKey,undefined];
				break;
		default:
			// 不是js 正常类型
        temp = selfKeyValue(tarKey,tarVal,isArray)
			// }
	}
	return temp;
}

export default function optimizeTypeStructureTree(interfaceDescs: InterfaceDescription[]) {
	allInterfaceDescs = interfaceDescs;
	const root = interfaceDescs?.[0] || {};
	const targetInfo: { [pname: string]: any} = {};

	keys(root.typeMap).forEach((item: any) => {
		const [key, value] = setFieldValue(item, root.typeMap?.[item]);
		targetInfo[key] = value;
	})
	return targetInfo;
}
