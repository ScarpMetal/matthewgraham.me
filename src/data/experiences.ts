import DateDisplay from '~/utils/DateDisplay';

const experiences: JSONBaseType<ExperienceType> = {
  ascii: [
    '█...█..██..███..█..█',
    '█...█.█..█.█..█.█.█.',
    '█.█.█.█..█.███..██..',
    '██.██.█..█.█..█.█.█.',
    '█...█..██..█..█.█..█',
  ],
  list: [
    {
      company_name: 'Amazon Web Services',
      company_url: 'https://aws.amazon.com/',
      positions: [
        {
          title: 'Front End Engineer',
          description: [
            'Worked closely with the UX team to rethink how AWS drives adoption to AWS AI/ML services.',
            'Improved team-wide mobile, accessibility, and animation development processes.',
            'Quickly built and delivered demo experiences in an agile team.',
          ],
          start_date: new DateDisplay('Sep', 2022),
          end_date: new DateDisplay('Dec', 2023),
        },
      ],
    },
    {
      company_name: 'Rhombus Systems',
      company_url: 'https://rhombus.com/',
      positions: [
        {
          title: 'Front End Engineer',
          description: [
            'Led marketing website development and improved SEO practices.',
            'Executed a large scale codebase refactor. Moved to Typescript, React Hooks, and Jotai.',
            'Implemented new features and bug fixes for the Rhombus console.',
          ],
          start_date: new DateDisplay('Oct', 2020),
          end_date: new DateDisplay('May', 2022),
        },
      ],
    },
    {
      company_name: 'ClutchPlay Games',
      company_url: 'http://clutchplaygames.com/',
      positions: [
        {
          title: 'Contract Engineer',
          description: 'Ported games to various video game consoles and mobile platforms.',
          start_date: new DateDisplay('Jun', 2020),
          end_date: new DateDisplay('Aug', 2020),
        },
      ],
    },
    {
      company_name: 'Dandelion Chocolate',
      company_url: 'https://www.dandelionchocolate.com/',
      positions: [
        {
          title: 'Software Engineer & Consultant',
          description: [
            'Worked closely with CEO Todd Masonis and the head production manager to improve production tracking methods.',
            'Implemented new features and bug fixes in a full stack (Web/IOS) environment.',
          ],
          start_date: new DateDisplay('Oct', 2018),
          end_date: new DateDisplay('Jul', 2020),
        },
      ],
    },
    {
      company_name: 'Whiteboard',
      positions: [
        {
          title: 'Founder',
          start_date: new DateDisplay('Apr', 2019),
          end_date: new DateDisplay('Jan', 2020),
        },
      ],
    },
    {
      company_name: 'Polymer',
      company_url: 'https://www.linkedin.com/company/polymerize/',
      positions: [
        {
          title: 'Software Engineering Co-op',
          start_date: new DateDisplay('Jun', 2018),
          end_date: new DateDisplay('Sep', 2018),
        },
      ],
    },
    {
      company_name: 'iD Coding & Engineering Academy',
      company_url: 'https://www.idtech.com/',
      positions: [
        {
          title: 'Instructor',
          description: [
            'Taught students ages 14-18 how to program IOS apps in Swift.',
            'Worked as a counselor for overnight students.',
          ],
          start_date: new DateDisplay('Jun', 2017),
          end_date: new DateDisplay('Aug', 2017),
        },
      ],
    },
    {
      company_name: 'Thomson Reuters',
      company_url: 'https://www.thomsonreuters.com/',
      positions: [
        {
          title: 'Software Test Engineering Co-op',
          start_date: new DateDisplay('Aug', 2016),
          end_date: new DateDisplay('Dec', 2016),
        },
      ],
    },
    {
      company_name: 'YPC Media',
      company_url: 'https://www.ypcmedia.com/',
      positions: [
        {
          title: 'Software Development Co-op',
          start_date: new DateDisplay('May', 2016),
          end_date: new DateDisplay('Aug', 2016),
        },
      ],
    },
  ],
};

export default experiences;
