import useSWRImmutable from 'swr/immutable'

export default function useFetchData<T>(queryKey: string) {
	const fetcher = async (endpoint: string) => {
		const res = await fetch('/api/' + endpoint)
		const data = await res.json()
		return data as T
	}

	return useSWRImmutable(queryKey, fetcher)
}
