import { EPickerCode, EPickerName, EPosition } from '@/enums'

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

export const positionLimits = {
	[EPosition.G]: { all: 8, partial: 2 },
	[EPosition.D]: { all: 12, partial: 3 },
	[EPosition.W]: { all: 16, partial: 4 },
	[EPosition.C]: { all: 12, partial: 3 },
} as const

export const positionOrder = [
	EPosition.C,
	EPosition.W,
	EPosition.D,
	EPosition.G,
] as const

export const validPositions = Object.values(EPosition).filter(
	(pos) => pos !== EPosition.L && pos !== EPosition.R,
)
