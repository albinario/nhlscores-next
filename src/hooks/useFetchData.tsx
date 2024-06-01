import useSWRImmutable from 'swr/immutable'

export default function useFetchData<T>(url: string) {
	const fetcher = async (url: string) => {
		const res = await fetch('/api/' + url)
		const data = await res.json()
		return data as T
	}

	return useSWRImmutable(url, fetcher)
}
