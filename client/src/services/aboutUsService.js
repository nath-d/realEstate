import axios from 'axios';
import config from '../../config.js';

const API_URL = config.api.baseUrl;

const aboutUsService = {
  // Get about us information (public)
  getAboutUsInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}/about-us`);
      return response.data;
    } catch (error) {
      console.error('Error fetching about us info:', error);
      throw error;
    }
  },

  // Admin methods for managing about us info
  createAboutUsInfo: async (data, token) => {
    try {
      const response = await axios.post(`${API_URL}/about-us`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating about us info:', error);
      throw error;
    }
  },

  updateAboutUsInfo: async (id, data, token) => {
    try {
      const response = await axios.put(`${API_URL}/about-us/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating about us info:', error);
      throw error;
    }
  },

  // Value management methods
  createValue: async (data, token) => {
    try {
      const response = await axios.post(`${API_URL}/about-us/values`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating value:', error);
      throw error;
    }
  },

  updateValue: async (id, data, token) => {
    try {
      const response = await axios.put(`${API_URL}/about-us/values/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating value:', error);
      throw error;
    }
  },

  deleteValue: async (id, token) => {
    try {
      const response = await axios.delete(`${API_URL}/about-us/values/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting value:', error);
      throw error;
    }
  },

  // Team member management methods
  createTeamMember: async (data, token) => {
    try {
      const response = await axios.post(`${API_URL}/about-us/team-members`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating team member:', error);
      throw error;
    }
  },

  updateTeamMember: async (id, data, token) => {
    try {
      const response = await axios.put(`${API_URL}/about-us/team-members/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
  },

  deleteTeamMember: async (id, token) => {
    try {
      const response = await axios.delete(`${API_URL}/about-us/team-members/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting team member:', error);
      throw error;
    }
  }
};

export default aboutUsService;
