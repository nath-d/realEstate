import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { CreateAboutUsInfoDto, UpdateAboutUsInfoDto, CreateAboutUsValueDto, UpdateAboutUsValueDto, CreateAboutUsTeamMemberDto, UpdateAboutUsTeamMemberDto } from './dto/about-us.dto';
import { AdminKeyGuard } from '../auth/guards/admin-key.guard';

@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  // Public endpoint to get about us info
  @Get()
  async getAboutUsInfo() {
    return this.aboutUsService.getAboutUsInfo();
  }

  // Admin endpoints for managing about us info
  @Post()
  @UseGuards(AdminKeyGuard)
  async createAboutUsInfo(@Body() createAboutUsInfoDto: CreateAboutUsInfoDto) {
    return this.aboutUsService.createAboutUsInfo(createAboutUsInfoDto);
  }

  @Put(':id')
  @UseGuards(AdminKeyGuard)
  async updateAboutUsInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAboutUsInfoDto: UpdateAboutUsInfoDto
  ) {
    return this.aboutUsService.updateAboutUsInfo(id, updateAboutUsInfoDto);
  }

  // Value management endpoints
  @Post('values')
  @UseGuards(AdminKeyGuard)
  async createValue(@Body() createAboutUsValueDto: CreateAboutUsValueDto) {
    return this.aboutUsService.createValue(createAboutUsValueDto);
  }

  @Put('values/:id')
  @UseGuards(AdminKeyGuard)
  async updateValue(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAboutUsValueDto: UpdateAboutUsValueDto
  ) {
    return this.aboutUsService.updateValue(id, updateAboutUsValueDto);
  }

  @Delete('values/:id')
  @UseGuards(AdminKeyGuard)
  async deleteValue(@Param('id', ParseIntPipe) id: number) {
    return this.aboutUsService.deleteValue(id);
  }

  // Team member management endpoints
  @Post('team-members')
  @UseGuards(AdminKeyGuard)
  async createTeamMember(@Body() createAboutUsTeamMemberDto: CreateAboutUsTeamMemberDto) {
    return this.aboutUsService.createTeamMember(createAboutUsTeamMemberDto);
  }

  @Put('team-members/:id')
  @UseGuards(AdminKeyGuard)
  async updateTeamMember(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAboutUsTeamMemberDto: UpdateAboutUsTeamMemberDto
  ) {
    return this.aboutUsService.updateTeamMember(id, updateAboutUsTeamMemberDto);
  }

  @Delete('team-members/:id')
  @UseGuards(AdminKeyGuard)
  async deleteTeamMember(@Param('id', ParseIntPipe) id: number) {
    return this.aboutUsService.deleteTeamMember(id);
  }
}
