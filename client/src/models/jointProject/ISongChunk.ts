export type ISongChunk = {
	jointProjectId: number;
	creatorId: number;
	name: string;
	description: string;
	audioUrl: string;
	createdAt: Date;
	updatedAt: Date;
};

export type AddChunkDto = Omit<
	ISongChunk,
	'createdAt' | 'updatedAt' | 'audioUrl'
>;
