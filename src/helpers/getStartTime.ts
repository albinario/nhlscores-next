export const getStartTime = (startDateTime: Date) =>
	('0' + startDateTime.getHours()).slice(-2) +
	':' +
	('0' + startDateTime.getMinutes()).slice(-2)
