import type { AxiosInstance } from 'axios'

export const getData = async <T>(endpoint: string, instance: AxiosInstance) => {
	const response = await instance.get<T>(endpoint)
	return response.data
}
