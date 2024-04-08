import DateDisplay from '~/utils/DateDisplay';

const projects: JSONBaseType<ProjectType> = {
  ascii: [
    '███..███...██.....█.████..███.█████.████',
    '█..█.█..█.█..█....█.█....█......█...█...',
    '███..███..█..█....█.███..█......█...████',
    '█....█..█.█..█.█..█.█....█......█......█',
    '█....█..█..██...██..████..███...█...████',
  ],
  list: [
    {
      title: 'Place Planner',
      description: "Created a web app for people to plan their artwork for Reddit's April Fool's Day event on r/place ",
      url: 'https://github.com/ScarpMetal/place-planner',
      date: new DateDisplay('Apr', 2022),
    },
    {
      title: 'CGP Grey Mostest Closest Planet Problem',
      description:
        'Recreated a visualization from CGP Grey\'s video "🌍Which Planet is the Closest?" Gray even retweeted it on Twitter!',
      url: 'https://codepen.io/ScarpMetal/full/WNNdgev',
      date: new DateDisplay('Nov', 2019),
    },
    {
      title: 'Intersecting Triangles Visualization',
      description:
        'Created in p5.js. This project was featured on the front page of Reddit in the r/oddlysatisfying subreddit. The post garnered over 2k upvotes!',
      url: 'https://www.reddit.com/r/oddlysatisfying/comments/dm0pyd/i_made_that_circle_thing_but_with_triangles/',
      date: new DateDisplay('Oct', 2019),
    },
    // {
    //   title: 'Maze Generation Algorithm',
    //   description: 'Simple DFS maze generation algorithm made in p5.js',
    //   url: 'https://codepen.io/ScarpMetal/full/rgjMWP',
    //   date: new DateDisplay('May', 2019),
    // },
    {
      title: 'Apollo',
      description:
        'Made a coding tutorial website with a live updating code editor. Our team created this app in 24 hours at BrickHack V. We were awarded $2000 to continue developing this product.',
      url: 'https://devpost.com/software/test-nij70v',
      date: new DateDisplay('Feb', 2019),
    },
    {
      title: 'Three.js Solar System',
      description:
        'One of my first forays into creative coding in a 3D environment. Fun Fact: It also used to be the visualization on the landing page of the original matthewgraham.me!',
      url: 'https://codepen.io/ScarpMetal/full/pLWbdq',
      date: new DateDisplay('Mar', 2018),
    },
    {
      title: 'Pinapple',
      description:
        'Created a peer-to-peer file sharing web app in 37 hours at HackUMass V. The app focused on intuitive user design and peer-to-peer file sharing. My team won Viacom\'s award for "Best Life Hack!"',
      url: 'https://devpost.com/software/pinapple',
      date: new DateDisplay('Nov', 2017),
    },
    {
      title: 'WEBLOC File Opener',
      description:
        'Simple opener for the weblock file type. My opener is publicly referenced on https://fileinfo.com/extension/webloc as a way to open this file type.',
      url: 'https://codepen.io/ScarpMetal/full/JrKNNY',
      date: new DateDisplay('Sep', 2017),
    },
    // {
    //   title: 'ChatRoom',
    //   description:
    //     'Messaging web app created from the ground up using C3 and .NET Core. Users can send messages, create new rooms and tag other users. Also implemented a fault tolerant server network that continued running even if a server went down.',
    //   url: 'https://github.com/ScarpMetal/ChatRoom',
    //   start_date: new DateDisplay('Mar', 2017),
    //   end_date: new DateDisplay('May', 2017),
    // },
    // {
    //   title: 'Suffragette Scavenger Hunt',
    //   description:
    //     'Scavenger hunt app using Estimote Proximity Beacons created for the "Because of Women Like Her" exhibit at the Rochester Public Library. Programmed in Swift.',
    //   url: 'https://github.com/ScarpMetal/SuffragetteScavengerHunt',
    //   start_date: new DateDisplay('Feb', 2017),
    //   end_date: new DateDisplay('Apr', 2017),
    // },
    // {
    //   title: 'Tone.js Envelope Visualizer',
    //   description:
    //     'Envelope Visualizer for the Tone.js Library. This project ended up being used by RIT faculty to teach students about digital audio. Made in p5.js',
    //   url: 'https://codepen.io/ScarpMetal/full/LyxMGx',
    //   date: new DateDisplay('Apr', 2017),
    // },
    {
      title: 'Spotify Together',
      description:
        'Created a mobile/web app that created a shared song queue for you and your friends. The app was created in 24 hours at BrickHack 3 and won Datto\'s award for "Best Use of Real Time Network Communication!"',
      url: 'https://devpost.com/software/spotify-together',
      date: new DateDisplay('Feb', 2017),
    },
    // {
    //   title: 'ZMR250 Miniquad',
    //   description:
    //     'Built a quadcopter racing drone over the Fall of 2016. This project involved learning how to solder, program flight controllers, and create a distributed power system.',
    //   start_date: new DateDisplay('Sep', 2016),
    //   end_date: new DateDisplay('Nov', 2016),
    // },
  ],
};

export default projects;
