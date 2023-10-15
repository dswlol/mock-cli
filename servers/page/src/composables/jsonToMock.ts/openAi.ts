
export const openAiNumber = (key: string, isArray: boolean) => {
	return isArray ? [`${key}|3`, [18]] : [`${key}|+1`, 18];
}


export const openAiString = (key: string,isArray:boolean) => {
	return isArray ?[ `${key}|3`, [`@string(lower,10)`] ]: [`${key}`, `@string(lower,10)`];
}

export const openAiDate = (key: string,isArray:boolean) => {
	return isArray?[ `${key}|3`, [`@date`] ]:[ `${key}`, `@date` ]
}
export const openAiBool = (key: string, isArray: boolean) => {

	return isArray?[ `${key}|3`, [true] ]:[ `${key}|1`, true ]
}


