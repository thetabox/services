import { AxiosError } from 'axios'

/* handle Axios errors to log a firebase logging **/
export function handleAxiosError(error: unknown) {
	const errorObject = error as AxiosError
	if (errorObject.isAxiosError) {
		console.error(errorObject.message.replace(/(\r\n|\n|\r)/gm, '') /*?*/)
		if (errorObject.response) {
			console.error(errorObject.response.data /*?*/)
		}
	} else console.error((error as Error).message.replace(/(\r\n|\n|\r)/gm, ''))
}
