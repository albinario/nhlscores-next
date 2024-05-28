import useSWR from 'swr'

export default function useFetchData<T>(url: string) {
	const fetcher = async (url: string) => {
		const res = await fetch('/api/' + url)
		const data = await res.json()
		return data as T
	}

	return useSWR(url, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	})
}
