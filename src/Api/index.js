import axios from './axios';
// import Axios from 'axios';

const ApiCallsService = {

    async getStates() {
        const response = await axios.get('http://stocksclue.com/api/Statutes/States').then(response => response.data);
        console.log(await response[0]);
        // export default response;
    }

    // getStatutesByState(){}
}

export default ApiCallsService;