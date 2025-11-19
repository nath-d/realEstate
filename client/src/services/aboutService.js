import axios from 'axios';
import config from '../../config.js';

const API = `${config.api.baseUrl}/about`;

const aboutService = {
    getContent: async () => (await axios.get(API)).data,
};

export default aboutService;

