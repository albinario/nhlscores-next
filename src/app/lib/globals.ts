import { EPickerCode, EPickerName } from '@/enums'

export const age = {
	day: 86400,
	week: 604800,
}

export const dateFormat = 'yyyy-MM-dd'

export const fallBackLogoUrl = '/apple-touch-icon-57x57.png'

type TPicker = {
	name: string
	code: string
}

export const pickers: TPicker[] = [
	{
		name: EPickerName.A,
		code: EPickerCode.A,
	},
	{
		name: EPickerName.J,
		code: EPickerCode.J,
	},
	{
		name: EPickerName.S,
		code: EPickerCode.S,
	},
	{
		name: EPickerName.V,
		code: EPickerCode.V,
	},
]
