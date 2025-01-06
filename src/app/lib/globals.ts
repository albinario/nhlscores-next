import { EPickerCode, EPickerName } from '@/enums'

export const dateFormat = 'yyyy-MM-dd'

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
