import { UploadBody, Upload, VideoBody, TranscodeUploadBody, Response, TranscodeUploadBodyExternal } from '@thetabox/model'
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

axios.defaults.timeout = 30000
const baseUrlVideoApi = 'https://api.thetavideoapi.com'

export class VideoApi {
	headers: AxiosRequestHeaders

	constructor(id: string, secret: string) {
		this.headers = {
			'x-tva-sa-id': id,
			'x-tva-sa-secret': secret,
			'Content-Type': 'application/json',
		}
	}

	async createPreSignedURL(): Promise<UploadBody> {
		const url = `${baseUrlVideoApi}/upload`
		const config: AxiosRequestConfig = { method: 'post', url, headers: this.headers }

		const data = await (await axios(config)).data
		return (data as Response).body as UploadBody
	}

	async uploadFile(data: ArrayBuffer, upload: Upload, onUploadProgress: any) {
		const headers: AxiosRequestHeaders = {
			'Content-Type': 'application/octet-stream',
		}

		const config: AxiosRequestConfig = {
			method: 'put',
			url: upload.presigned_url,
			headers,
			data,
			onUploadProgress: onUploadProgress,
		}
		const result = await axios(config)
		return result
	}

	async checkTranscodeProgress(id: string): Promise<VideoBody> {
		const url = `${baseUrlVideoApi}/video/${id}`
		const config: AxiosRequestConfig = { method: 'get', url, headers: this.headers }
		const data = await (await axios(config)).data
		return (data as Response).body as VideoBody
	}

	async transcodeVideo(transcodeUploadBody: TranscodeUploadBody): Promise<VideoBody> {
		const url = `${baseUrlVideoApi}/video`
		const config: AxiosRequestConfig = { method: 'post', url, headers: this.headers, data: transcodeUploadBody }
		const data = await (await axios(config)).data
		return (data as Response).body as VideoBody
	}

	async transcodeExternalVideo(transcodeUploadBody: TranscodeUploadBodyExternal): Promise<VideoBody> {
		const url = `${baseUrlVideoApi}/video`
		const config: AxiosRequestConfig = { method: 'post', url, headers: this.headers, data: transcodeUploadBody }
		const data = await (await axios(config)).data
		return (data as Response).body as VideoBody
	}
}
