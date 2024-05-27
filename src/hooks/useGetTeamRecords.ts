import { useQuery } from '@tanstack/react-query'
import { getTeamRecords } from '../services/NhlAPI'

export const useGetTeamRecords = () =>
	useQuery({
		queryKey: ['teamRecords'],
		queryFn: getTeamRecords,
	})
