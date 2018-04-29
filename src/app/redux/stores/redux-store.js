import developmentStore from './development-store';
import Environment from '../../../types/environment';
import productionStore from './production-store';

export default process.env.NODE_ENV === Environment.DEVELOPMENT ? developmentStore : productionStore;
