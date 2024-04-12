type Link = `http${string}`;

interface DateDisplayInterface {
  toString(): string;
}
interface JSONBaseType<T> {
  ascii: string[];
  list?: T[];
  info?: T;
}

type ContactInfoType = {
  phone: string;
  email: string;
  socials: { [siteKey: string]: string };
  resume: Link;
};

type PositionType = {
  title: string;
  description?: string | string[];
  start_date: DateDisplayInterface;
  end_date: DateDisplayInterface;
};

type ExperienceType = {
  company_name: string;
  company_url?: Link;
  positions: PositionType[];
};

type ProjectType =
  | ({
      title: string;
      description: string;
      url?: Link;
    } & {
      date: DateDisplayInterface;
    })
  | {
      start_date: DateDisplayInterface;
      end_date: DateDisplayInterface;
    };
