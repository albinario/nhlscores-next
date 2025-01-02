import { EPath } from '@/enums'
import useSWR from 'swr'

export const useFetchData = <T,>(endpoint: string) => {
	const fetcher = async (endpoint: string): Promise<T> => {
		const res = await fetch(EPath.api + endpoint)
		const data: T = await res.json()

		return data
	}

	return useSWR(endpoint, fetcher, {
		revalidateOnFocus: false,
		revalidateOnMount: true,
	})
}
