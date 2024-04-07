const experiences: JSONBaseType<ExperienceType> = {
  ascii: [
    '███████.██...██.██████..███████.██████..██.███████.███....██..██████.███████.███████',
    '██.......██.██..██...██.██......██...██.██.██......████...██.██......██......██.....',
    '█████.....███...██████..█████...██████..██.█████...██.██..██.██......█████...███████',
    '██.......██.██..██......██......██...██.██.██......██..██.██.██......██...........██',
    '███████.██...██.██......███████.██...██.██.███████.██...████..██████.███████.███████',
  ],
  list: [
    {
      company_name: 'Amazon Web Services',
      company_url: 'https://aws.amazon.com/',
      positions: [
        {
          title: 'Front End Engineer',
          description:
            'Worked with an agile team to build and deliver beautiful machine learning demo experiences to help drive engagement to the AWS platform. This also included mobile and accessibility initiatives.',
          start_date: new Date('Sep 2022'),
          end_date: new Date('Dec 2023'),
        },
      ],
    },
    {
      company_name: 'Rhombus Systems',
      company_url: 'https://rhombus.com/',
      positions: [
        {
          title: 'Front End Engineer',
          description:
            'Implemented new features and bug fixes for the Rhombus console. Part of this work has involved codebase-wide refactoring of Javascript -> Typescript, Mobx -> React Hooks, React Contexts -> Jotai. Architected a complete overhaul of the marketing website and helped improve SEO practices.',
          start_date: new Date('Oct 2020'),
          end_date: new Date('May 2022'),
        },
      ],
    },
    {
      company_name: 'ClutchPlay Games',
      company_url: 'http://clutchplaygames.com/cp/',
      positions: [
        {
          title: 'Contract Engineer',
          description: 'Worked on porting games to various video game consoles and mobile platforms.',
          start_date: new Date('Jun 2020'),
          end_date: new Date('Aug 2020'),
        },
      ],
    },
    {
      company_name: 'Dandelion Chocolate',
      company_url: '',
      positions: [
        {
          title: 'Software Engineer & Consultant',
          description:
            'Sole developer and consultant for Dandelion’s custom production tracking software. Worked closely with their CEO and production managers to improve their production tracking methods.',
          start_date: new Date('Oct 2018'),
          end_date: new Date('Jul 2020'),
        },
      ],
    },
    {
      company_name: 'Whiteboard',
      company_url: '',
      positions: [
        {
          title: 'Founder',
          description:
            'Worked with a co-founder to create an interactive coding tutorial platform. Put an emphasis on creating a cost structure that was scalable and could operate the entire site on less than $5/mo. Learned everything from product development and design to business planning and management.',
          start_date: new Date('Apr 2019'),
          end_date: new Date('Jan 2020'),
        },
      ],
    },
    {
      company_name: 'Polymer',
      company_url: '',
      positions: [
        {
          title: 'Software Engineering Co-op',
          description:
            'Worked as a full-stack developer in a fast-paced startup environment. Worked across the entire stack (React + Redux, React Native and Django) while collaborating with other full-stack engineers. I was also able to do some D3.js data visualizations.',
          start_date: new Date('Jun 2018'),
          end_date: new Date('Sep 2018'),
        },
      ],
    },
    {
      company_name: 'iD Coding & Engineering Academy',
      company_url: '',
      positions: [
        {
          title: 'Instructor',
          description:
            'Taught students ages 14-18 how to program IOS apps in Swift. Also worked as a counselor for the two-week long boarding camps.',
          start_date: new Date('Jun 2017'),
          end_date: new Date('Aug 2017'),
        },
      ],
    },
    {
      company_name: 'Thomson Reuters',
      company_url: '',
      positions: [
        {
          title: 'Software Test Engineering Co-op',
          description:
            'Worked in a large Agile team that developed and created tests using Java, Maven, Spring, Jenkins, and Oracle SQL. The database we maintained was largely utilized by lawyers and law enforcement.',
          start_date: new Date('Aug 2016'),
          end_date: new Date('Dec 2016'),
        },
      ],
    },
    {
      company_name: 'YPC Media',
      company_url: '',
      positions: [
        {
          title: 'Software Development Co-op',
          description:
            'Worked on a small team that developed new features for YPC’s CRM. Met with the sales and management teams to brainstorm new features and develop feature requirements. Worked heavily with C# and .NET Core.',
          start_date: new Date('May 2016'),
          end_date: new Date('Aug 2016'),
        },
      ],
    },
  ],
};

export default experiences;
