import type { Goal } from '../types'

export const getGoalTypes = (goal: Goal, gameWinner: boolean) => {
	const goalTypes: string[] = []

	goal.strength === 'pp'
		? goalTypes.push('PP')
		: goal.strength === 'sh' && goalTypes.push('SH')

	goal.goalModifier === 'empty-net' && goalTypes.push('EN')

	gameWinner && goalTypes.push('GW')

	return goalTypes
}
