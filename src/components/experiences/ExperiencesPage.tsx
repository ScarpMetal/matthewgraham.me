import { useAtomValue } from 'jotai';
import { displayExperiencesAtom } from '~/atoms';
import { TagFilters } from '../tags';
import Experience from './Experience';

import './ExperiencesPage.scss';

export default function ExperiencesPage() {
  const experiences = useAtomValue(displayExperiencesAtom);

  return (
    <article className="content">
      <h1 id="experiences">Experience</h1>
      <TagFilters />
      {experiences.length === 0 && (
        <p
          style={{
            marginTop: 40,
            fontStyle: 'italic',
            fontSize: 14,
          }}
        >
          No experiences found, please select more tags.
        </p>
      )}
      <div className="experiences-wrapper">
        {experiences.map((exp) => (
          <Experience key={exp.id} experience={exp} />
        ))}
      </div>
    </article>
  );
}
