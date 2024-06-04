import { ISongChunk } from './ISongChunk';

export type IJointProject = {
	id: number;
	headline: string;
	description: string;
	musicians: IJointMusician[];
	songChunks: ISongChunk[];
	createdAt: Date;
	updatedAt: Date;
};

export type IJointMusician = {
	id: number;
	name: string;
	mainRole: string;
	avatarUrl: string;
	user: {
		email: string;
	};
};

export type SmartJoint = Omit<IJointProject, 'musicians'> & {
	companion: IJointMusician;
};
