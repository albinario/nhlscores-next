import { useQuery } from '@tanstack/react-query'
import { getPlayersPicked } from '../services/TradesAPI'

export const useGetPlayersPicked = () =>
	useQuery({
		queryKey: ['playersPicked'],
		queryFn: getPlayersPicked,
	})
