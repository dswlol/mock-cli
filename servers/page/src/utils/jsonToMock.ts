const FILEDTYPE = {
	number: 'Number',
	string: 'String',
	boolean: 'Boolean',
	null: 'Null',
	undefined: 'Undefined',
	symbol: 'Symbol',
	object: 'Object',
	array: 'Array',
	function: 'Function',
	date: 'Date',
	regExp:'RegExp'
}

const typeOf = (data: any):string => {
  return Object.prototype.toString.call(data).slice(8, -1);
}



const getInitValue = (val: any): any => {

	if ([FILEDTYPE.object,FILEDTYPE.null].includes(typeOf(val))) {
		return {};
	} else if (FILEDTYPE.array===typeOf(val)) {
		return []
	}
}

const jsonEach = (dataSource: any, mockTarget: any) => {

	const reflectMap = {
		[FILEDTYPE.object]: (item:any) => {
			Object.entries(item).forEach(([key, val]) => {
				mockTarget
			})
		}
	}
	// 数组处理
	if (typeOf(dataSource)===FILEDTYPE.array) {
	//   return	dataSource.forEach(item => {
	// 	})
	}
	if (typeof value === 'object' && value !== null) {
			const props = Object.entries(value)
					.map(([key, val]) => `${key}: ${getType(val)}`)
					.join('; ');
			return `{ ${props} }`;
	}
        return typeof value;
}

export const jsonToMock = (dataSource: any) => {
	if (!dataSource) return {};
	const mockTarget = {}
	return jsonEach(dataSource,mockTarget)
}
