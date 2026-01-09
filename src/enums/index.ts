export enum EPlayerAddForm {
	id = 'id',
	picker = 'picker',
}

export enum EPlayerEditForm {
	id = EPlayerAddForm.id,
	jersey = 'jersey',
	picker = EPlayerAddForm.picker,
	pos = 'pos',
	teamAbbrev = 'teamAbbrev',
}

export enum EPickerCode {
	A = 'a',
	J = 'j',
	S = 's',
	V = 'v',
}

export enum EPickerName {
	A = 'Albin',
	J = 'Jakob',
	S = 'Sacke',
	V = 'Ville',
}

export enum EPosition {
	C = 'C',
	D = 'D',
	G = 'G',
	L = 'L',
	R = 'R',
	W = 'W',
}

export enum EPath {
	api = 'api/',
	game = 'game/',
	games = 'games/',
	playersPicked = 'players/picked',
	players = 'players',
	teamRecords = 'teamRecords',
	schedule = 'schedule/',
}

export enum ESource {
	mongoose = 'Mongoose',
	server = 'Server',
}
