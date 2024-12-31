import useSWR from 'swr'

export const useFetchData = <T,>(queryKey: string) => {
	const fetcher = async (endpoint: string): Promise<T> => {
		const res = await fetch('/api/' + endpoint)
		const data = await res.json()

		return data
	}

	return useSWR(queryKey, fetcher, {
		revalidateOnFocus: false,
		revalidateOnMount: true,
	})
}
