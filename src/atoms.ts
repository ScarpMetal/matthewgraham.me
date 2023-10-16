import { atom } from "jotai";

import experiencesData from "~/data/experiences.json";
import projectsData from "~/data/projects.json";
import tagsData from "~/data/tags.json";
import { listsShareItem } from "~/utils";

export const experiencesAtom = atom<ExperienceType[]>(experiencesData.data);
export const displayExperiencesAtom = atom((get) => {
  const experiences = get(experiencesAtom);
  const selectedTagIds = get(selectedTagIdsAtom);
  return experiences.filter((experience) =>
    listsShareItem(experience.tagIds, selectedTagIds)
  );
});
export const projectsAtom = atom<ProjectType[]>(projectsData.data);
export const displayProjectsAtom = atom((get) => {
  const projects = get(projectsAtom);
  const selectedTagIds = get(selectedTagIdsAtom);
  return projects.filter((project) =>
    listsShareItem(project.tagIds, selectedTagIds)
  );
});

export const tagsAtom = atom<TagType[]>(tagsData.data);
export const selectedTagIdsAtom = atom<TagId[]>(
  tagsData.data.map((tag) => tag.id)
);
