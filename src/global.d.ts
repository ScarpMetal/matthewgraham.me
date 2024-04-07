interface DateDisplayInterface {
  toString(): string;
}
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
      date: DateDisplayInterface;
    })
  | {
      start_date: DateDisplayInterface;
      end_date: DateDisplayInterface;
    };

type PositionType = {
  title: string;
  description: string;
  start_date: DateDisplayInterface;
  end_date: DateDisplayInterface;
};

type ExperienceType = {
  company_url: string;
  company_name: string;
  positions: PositionType[];
};
