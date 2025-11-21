import useSWR from 'swr'

import { EPath } from '@/enums'

export const useFetchData = <T,>(endpoint: string | null) => {
	const fetcher = async (endpoint: string): Promise<T> => {
		const res = await fetch(EPath.api + endpoint)

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`)
		}

		const data: T = await res.json()
		return data
	}

	return useSWR(endpoint, fetcher, {
		revalidateOnFocus: false,
		errorRetryCount: 3,
		errorRetryInterval: 5000,
		revalidateIfStale: true,
		revalidateOnReconnect: true,
	})
}
