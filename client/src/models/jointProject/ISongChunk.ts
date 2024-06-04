export type ISongChunk = {
	jointProjectId: number;
	creatorId: number;
	name: string;
	description: string;
	audioUrl: string;
	createdAt: Date;
	updatedAt: Date;
};

export type AddChunkDto = {
	name: string;
	description: string;
	audio: File;
};

export type SimpleAddChunkDto = Omit<AddChunkDto, 'audio'>;
