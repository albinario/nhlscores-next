import type { AxiosInstance } from 'axios'

export const getData = async <T>(endpoint: string, instance: AxiosInstance) => {
	const { data } = await instance.get<T>(endpoint)

	return data
}
