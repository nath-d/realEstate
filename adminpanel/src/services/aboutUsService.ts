import apiService from './apiService';
import type {
  AboutUsInfo,
  AboutUsValue,
  AboutUsTeamMember,
  CreateAboutUsInfoDto,
  CreateAboutUsValueDto,
  CreateAboutUsTeamMemberDto
} from '../types/aboutUs';

class AboutUsService {
  // About Us Info methods
  async getAboutUsInfo(): Promise<AboutUsInfo> {
    const response = await apiService.get('/about-us');
    return response; // apiService.get() already returns the parsed JSON
  }

  async createAboutUsInfo(data: CreateAboutUsInfoDto): Promise<AboutUsInfo> {
    const response = await apiService.post('/about-us', data);
    return response; // apiService.post() already returns the parsed JSON
  }

  async updateAboutUsInfo(id: number, data: Partial<CreateAboutUsInfoDto>): Promise<AboutUsInfo> {
    const response = await apiService.put(`/about-us/${id}`, data);
    return response; // apiService.put() already returns the parsed JSON
  }

  // Value methods
  async createValue(data: CreateAboutUsValueDto): Promise<AboutUsValue> {
    const response = await apiService.post('/about-us/values', data);
    return response; // apiService.post() already returns the parsed JSON
  }

  async updateValue(id: number, data: Partial<CreateAboutUsValueDto>): Promise<AboutUsValue> {
    const response = await apiService.put(`/about-us/values/${id}`, data);
    return response; // apiService.put() already returns the parsed JSON
  }

  async deleteValue(id: number): Promise<void> {
    await apiService.delete(`/about-us/values/${id}`);
  }

  // Team member methods
  async createTeamMember(data: CreateAboutUsTeamMemberDto): Promise<AboutUsTeamMember> {
    const response = await apiService.post('/about-us/team-members', data);
    return response; // apiService.post() already returns the parsed JSON
  }

  async updateTeamMember(id: number, data: Partial<CreateAboutUsTeamMemberDto>): Promise<AboutUsTeamMember> {
    const response = await apiService.put(`/about-us/team-members/${id}`, data);
    return response; // apiService.put() already returns the parsed JSON
  }

  async deleteTeamMember(id: number): Promise<void> {
    await apiService.delete(`/about-us/team-members/${id}`);
  }
}

export default new AboutUsService();
