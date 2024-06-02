export interface IOffer {
	id: number;
	headline: string;
	body: string;
	mainRoles: string[];
	genres: string[];
	location: string;
	expirationDate: Date;
	photoUrl: string;
	createdAt: Date;
	musician: {
		name: string;
		user: {
			email: string;
		};
	};
}

export type MyOffer = Omit<
	IOffer,
	'id' | 'createdAt' | 'musician' | 'photoUrl'
> & {
	photo?: File;
};

export type CreateOfferDto = Omit<MyOffer, 'photo'>;
