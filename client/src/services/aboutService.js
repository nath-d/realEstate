import axios from 'axios';

const API = 'http://localhost:3000/about';

const aboutService = {
    getContent: async () => (await axios.get(API)).data,
};

export default aboutService;

