import { IJointMusician } from '../jointProject/IJointProject';
import { CreateJointDto } from '../jointProject/dto/CreateJointDto';

export type CreateJointResponse = Omit<CreateJointDto, 'musicians'> & {
	musicians: IJointMusician[];
};
