import { ISongChunk } from './ISongChunk';

export type IJointProject = {
	id: number;
	headline: string;
	description: string;
	musicians: IJointMusician[];
	songChunks: ISongChunk[];
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
