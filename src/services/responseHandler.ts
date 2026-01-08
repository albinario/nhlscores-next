import { NextResponse } from 'next/server'

import { ESource } from '@/enums'

export const errorResponse = (
	error: Error | unknown,
	errorMessage: string,
	source: ESource,
) => {
	const errorMessageFull = `${source} error when ${errorMessage}: `
	const status = source === ESource.server ? 500 : 400

	console.error(errorMessageFull, error)

	return NextResponse.json(
		{
			error: errorMessageFull + error,
			details: error instanceof Error ? error.message : error,
		},
		{ status },
	)
}

export const response = (message: string, status: number) =>
	NextResponse.json({ message }, { status })

export const successResponse = <T>(data?: T) =>
	NextResponse.json(data || { success: true }, { status: 200 })
