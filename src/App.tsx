import { differenceInCalendarYears } from 'date-fns';
import { Provider } from 'jotai';
import { Helmet } from 'react-helmet';
import JsonView, { JsonViewProps } from 'react18-json-view';

import experiences from '~/data/experiences';
import projects from '~/data/projects';
import { useParallax } from '~/utils/parallax';

export default function App() {
  useParallax('.parallax-bg', { scale: 0.75 });
  useParallax('.parallax-tag', { scale: 0.1 });

  const jsonViewProps: JsonViewProps = {
    src: { experiences, projects },
    theme: 'default',
    dark: true,
    matchesURL: true,
    displaySize: 'collapsed',
    collapsed: (params) => {
      // Collapse positions in the experiences json if they happened 4 calendar years ago
      if (params.indexOrName === 'positions') {
        if (!Array.isArray(params.node) || !params.node.length) return false; // Verify list has items

        const latestPosition = params.node[0];
        if (typeof latestPosition !== 'object') return false; // Verify list node is an object

        const endDate = latestPosition.end_date;
        if (!(endDate instanceof Date)) return false; // Verify the end_date list node property is a Date

        return differenceInCalendarYears(new Date(), latestPosition.end_date) > 4;
      }

      return false;
    },
    style: {
      backgroundColor: 'none',
    },
  };

  return (
    <Provider>
      <Helmet>
        <title>matthewgraham.me</title>
        <meta name="description" content="View Matthew Graham's projects and work experiences." />
      </Helmet>
      <JsonView {...jsonViewProps} />
    </Provider>
  );
}
