import { AxiosResponse } from 'axios';
import $api from '../http/axiosSetUp';
import { IJointProject } from '../models/jointProject/IJointProject';
import { CreateJointDto } from '../models/jointProject/dto/CreateJointDto';
import { CreateJointResponse } from '../models/response/CreateJointResponse';
import {
	ISongChunk,
	SimpleAddChunkDto,
} from '../models/jointProject/ISongChunk';

export default class JointProjectsService {
	static async getAllJointsForMusician(): Promise<
		AxiosResponse<IJointProject[]>
	> {
		return $api.get<IJointProject[]>(`joint-projects/by-musician`);
	}

	static async createJoint(
		createJointDto: CreateJointDto
	): Promise<AxiosResponse<CreateJointResponse>> {
		return $api.post<CreateJointResponse>(`joint-projects`, createJointDto);
	}

	static async addSongChunk(
		audio: File,
		jointProjectId: number,
		addChunkDto: SimpleAddChunkDto,
		creatorId: number
	): Promise<AxiosResponse<ISongChunk>> {
		const formData = new FormData();
		formData.append('audio', audio);

		formData.append('creatorId', creatorId.toString());

		for (let [key, value] of Object.entries(addChunkDto)) {
			formData.append(key, value.toString());
		}

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};

		return $api.post<ISongChunk>(
			`joint-projects/${jointProjectId}`,
			formData,
			config
		);
	}

	static async getJointsCount(): Promise<AxiosResponse<number>> {
		return $api.get<number>(`joint-projects/count`);
	}
}
