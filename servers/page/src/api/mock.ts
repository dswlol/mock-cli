import { useRequest } from 'vue-request'

export const testRequest = () => {
	const { data, loading, error } = useRequest(() => http.post('/mock/post'))
	return { data, loading, error }
}

// 查询产品列表信息
export const queryProductList = () => useRequest(() => http.get('/_queryProductList'));


export const saveMock = (body:any) => {
	const { data, loading, error } = useRequest(() => http.post('/_addMock',body))
	return { data, loading, error }
}

export const saveMockApi = (body:any) => {
	const { data, loading, error } = useRequest(() => http.post('/_addMockUrl',body))
	return { data, loading, error }
}

export const getProjectUrls = (body:any) => {
	const { data, loading, error } = useRequest(() => http.post('/_getProjectUrls',body))
	return { data, loading, error }
}
