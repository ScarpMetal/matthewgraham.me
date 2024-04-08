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
};

type PositionType = {
  title: string;
  description: string;
  start_date: DateDisplayInterface;
  end_date: DateDisplayInterface;
};

type ExperienceType = {
  company_name: string;
  company_url?: string;
  positions: PositionType[];
};

type ProjectType =
  | ({
      title: string;
      description: string;
      url?: string;
    } & {
      date: DateDisplayInterface;
    })
  | {
      start_date: DateDisplayInterface;
      end_date: DateDisplayInterface;
    };
