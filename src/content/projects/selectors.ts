// src/content/projects/selectors.ts
// filtering utilities for project data

import type { Project } from '~/shared/types';

import { projects } from './all';
import {
  FEATURED_PROJECT_TITLES,
  WIDE_FEATURED_PROJECT_TITLES,
} from './featured';
import { skillMappings } from './skillMappings';

// get featured projects by title list
export const getFeaturedProjects = (includeWide = false): Project[] => {
  const titles = includeWide
    ? [...FEATURED_PROJECT_TITLES, ...WIDE_FEATURED_PROJECT_TITLES]
    : FEATURED_PROJECT_TITLES;
  return titles
    .map(title => projects.find(p => p.title === title))
    .filter((p): p is Project => p !== undefined);
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
