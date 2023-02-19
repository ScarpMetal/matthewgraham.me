declare module "*.svg" {
  const content: string;
  export default content;
}

type TagId = string;
type ProjectId = string;
type ExperienceId = string;

type ImageType = {
  path: string;
  url: string;
};

type TagType = {
  color: string;
  id: TagId;
  name: string;
};

type ProjectType = {
  sourceUrl: string;
  sourceName: string;
  tagIds: TagId[];
  dateInfo: string;
  images: ImageType[];
  title: string;
  description: string;
  id: ProjectId;
};

type ExperienceType = {
  sourceUrl: string;
  sourceName: string;
  tagIds: TagId[];
  dateInfo: string;
  images: ImageType[];
  title: string;
  description: string;
  id: ExperienceId;
};
