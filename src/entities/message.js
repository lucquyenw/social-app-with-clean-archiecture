export default function message(room, username, message, timestamp) {
	return {
		getRoom: () => room,
		getUsername: () => username,
		getMessage: () => message,
		geteTimeStamp: () => timestamp,
	};
}
