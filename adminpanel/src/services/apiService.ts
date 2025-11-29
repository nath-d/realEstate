import config from '../../config';

const API_BASE_URL = config.api.baseUrl;

class ApiService {
  private getAuthToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  private getAuthHeaders(): HeadersInit {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'x-admin-key': config.admin.apiKey, // Add admin key for all requests
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async request(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    // If unauthorized, redirect to login
    if (response.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    return response;
  }

  async get(endpoint: string): Promise<any> {
    const response = await this.request(endpoint);
    return response.json();
  }

  async post(endpoint: string, data?: any): Promise<any> {
    const response = await this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('POST request failed:', {
        status: response.status,
        statusText: response.statusText,
        url: endpoint,
        data: data,
        errorResponse: errorData
      });
      
      try {
        const parsedError = JSON.parse(errorData);
        throw new Error(parsedError.message || `Request failed with status ${response.status}`);
      } catch (parseError) {
        throw new Error(`Request failed with status ${response.status}: ${errorData}`);
      }
    }

    return response.json();
  }

  async put(endpoint: string, data?: any): Promise<any> {
    const response = await this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  }

  async delete(endpoint: string): Promise<any> {
    const response = await this.request(endpoint, {
      method: 'DELETE',
    });
    return response.json();
  }

  // File upload with authentication
  async uploadFile(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<any> {
    const token = this.getAuthToken();
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    const headers: HeadersInit = {
      'x-admin-key': config.admin.apiKey, // Add admin key for file uploads
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (response.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    return response.json();
  }
}

export const apiService = new ApiService();
export default apiService;
