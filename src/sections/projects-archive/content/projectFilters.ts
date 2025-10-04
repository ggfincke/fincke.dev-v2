// src/sections/projects-archive/content/projectFilters.ts
// filtering utilities for project data

import type { Project } from '~/shared/types';

import { projects } from './projects';
import { skillMappings } from './skillMappings';

// get featured projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

// get all projects
export const getAllProjects = (): Project[] => {
  return projects;
};

// get projects filtered by skill/technology
export const getProjectsBySkill = (skillName: string): Project[] => {
  // normalize skill name for matching
  const normalizedSkill = skillName.toLowerCase();

  // pull canonical matches via skill mappings
  const skillSearchTerms = skillMappings[normalizedSkill] || [normalizedSkill];

  return projects.filter(project => {
    // confirm project technologies include any mapped term
    return project.technologies.some((tech: string) => {
      const normalizedTech = tech.toLowerCase();
      return skillSearchTerms.includes(normalizedTech);
    });
  });
};
