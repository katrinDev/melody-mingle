import { AxiosError } from 'axios';
import SnackbarPropsStore from './SnackbarPropsStore';
import { makeAutoObservable } from 'mobx';
import {
	IJointMusician,
	IJointProject,
	SmartJoint,
} from '../models/jointProject/IJointProject';
import JointProjectsService from '../services/JointProjectsService';
import { AddChunkDto, ISongChunk } from '../models/jointProject/ISongChunk';

export default class JointProjectsStore {
	joints = [] as SmartJoint[];
	jointsCount = 0;

	constructor() {
		makeAutoObservable(this, {}, { deep: true });
	}

	private setJointsCount(count: number) {
		this.jointsCount = count;
	}

	private addSongChunk(songChunk: ISongChunk) {
		let joint = this.joints.find(
			joint => joint.id === songChunk.jointProjectId
		)!;

		joint.songChunks.push(songChunk);
	}

	private setSmartJoints(allInfoJoints: IJointProject[], myId: number) {
		const smartJoints = allInfoJoints.map(joint => {
			const companion: IJointMusician = joint.musicians.find(
				mus => mus.id !== myId
			)!;

			const jointProjectCopy = Object.assign(joint);
			delete jointProjectCopy.musicians;

			return { ...jointProjectCopy, companion };
		});

		this.joints = smartJoints;
	}

	async fetchJointsForUser(snackbarStore: SnackbarPropsStore, myId: number) {
		try {
			const { data } = await JointProjectsService.getAllJointsForMusician();
			this.setSmartJoints(data, myId);
		} catch (error) {
			if (error instanceof AxiosError) {
				const serverMessage = error.response?.data.message;

				snackbarStore.changeAll(true, 'danger', `${serverMessage}`);
			}
		}
	}

	async fetchJointsCount(snackbarStore: SnackbarPropsStore) {
		try {
			const { data } = await JointProjectsService.getJointsCount();

			this.setJointsCount(data);
		} catch (error) {
			if (error instanceof AxiosError) {
				const serverMessage = error.response?.data.message;

				snackbarStore.changeAll(true, 'danger', `${serverMessage}`);
			}
		}
	}

	async createSongChunk(
		snackbarStore: SnackbarPropsStore,
		audio: File,
		addChunkDto: AddChunkDto
	) {
		try {
			const { data } = await JointProjectsService.addSongChunk(
				audio,
				addChunkDto
			);
			this.addSongChunk(data);
			snackbarStore.changeAll(true, 'success', 'Проект успешно дополнен');
		} catch (error) {
			if (error instanceof AxiosError) {
				const serverMessage = error.response?.data.message;

				snackbarStore.changeAll(true, 'danger', `${serverMessage}`);
			}
		}
	}
}
