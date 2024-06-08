import axios from 'axios'
import { getData } from '@/helpers/getData'
import type { TPlayerSearch } from '@/types'

const instance = axios.create({
	baseURL: 'https://search.d3.nhle.com/api/v1/search/player',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	timeout: 10000,
})

export const searchPlayers = async (searchInput: string) =>
	getData<TPlayerSearch[]>(
		'?culture=en-us&limit=20&active=true&q=' + searchInput,
		instance
	)
