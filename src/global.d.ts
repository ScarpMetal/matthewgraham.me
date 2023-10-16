type TagId = string;
type ProjectId = string;
type ExperienceId = string;

type ImageType = {
  alt: string;
  url: string;
};

type TagType = {
  color: string;
  textColor: string;
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
  sourceUrl?: string;
  sourceName?: string;
  tagIds: TagId[];
  dateInfo?: string;
  images: ImageType[];
  title: string;
  description: string;
  id: ExperienceId;
};
