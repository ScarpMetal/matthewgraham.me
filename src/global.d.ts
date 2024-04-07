interface JSONBaseType<T> {
  ascii: string[];
  list: T[];
}

type ProjectType =
  | ({
      title: string;
      description: string;
      url?: string;
    } & {
      date: Date;
    })
  | {
      start_date: Date;
      end_date: Date;
    };

type PositionType = {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
};

type ExperienceType = {
  company_url: string;
  company_name: string;
  positions: PositionType[];
};
