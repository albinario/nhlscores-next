import type { TGoal } from '@/types'

export const getGoalTypes = (goal: TGoal, gameWinner: boolean) => {
	const goalTypes: string[] = []

	if (goal.strength === 'pp') {
		goalTypes.push('PP')
	} else if (goal.strength === 'sh') {
		goalTypes.push('SH')
	}

	if (goal.goalModifier === 'empty-net') {
		goalTypes.push('EN')
	}

	if (gameWinner) {
		goalTypes.push('GW')
	}

	return goalTypes
}
