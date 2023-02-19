export type TagId = string;
export type ProjectId = string;
export type ExperienceId = string;

export type Image = {
  path: string;
  url: string;
};

export type Tag = {
  color: string;
  id: TagId;
  name: string;
};

export type Project = {
  sourceUrl: string;
  sourceName: string;
  tags: TagId[];
  dateInfo: string;
  images: Image[];
  title: string;
  description: string;
  id: ProjectId;
};

export type Experience = {
  sourceUrl: string;
  sourceName: string;
  tags: TagId[];
  dateInfo: string;
  images: Image[];
  title: string;
  description: string;
  id: ExperienceId;
};
