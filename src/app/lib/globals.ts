import { EPickerCode, EPickerName } from '@/enums'
import type { TPicker } from '@/types'

export const dateFormat = 'yyyy-MM-dd'

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
