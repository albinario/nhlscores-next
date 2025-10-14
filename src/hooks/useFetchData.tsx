import { EPath } from '@/enums'
import useSWR from 'swr'

export const useFetchData = <T,>(endpoint: string) => {
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
		revalidateOnMount: true,
		// SWR handles client-side caching and deduplication
		dedupingInterval: 2000, // Dedupe requests within 2 seconds
		errorRetryCount: 3,
		errorRetryInterval: 5000,
		// Let server cache headers control data freshness
		revalidateIfStale: true,
		revalidateOnReconnect: true,
	})
}
