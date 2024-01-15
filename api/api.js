import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_HRFLOW_API_KEY;
const BOARD_KEY = process.env.NEXT_PUBLIC_HRFLOW_BOARD_KEY;

const api = axios.create({
  baseURL: 'https://api.hrflow.ai/v1/',
  headers: {
    'X-API-KEY': API_KEY,
  },
});

export const getJobs = async () => {
    try {
      const response = await api.get('jobs/searching', {
        params: {
          board_keys: [BOARD_KEY],
        },
      });
      console.log("Fetched Jobs Data:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
};
