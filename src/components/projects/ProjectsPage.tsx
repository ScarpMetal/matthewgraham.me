import { TagFilters } from '../tags';
import Project from './Project';

import { useAtomValue } from 'jotai';
import { displayProjectsAtom } from '~/atoms';
import './ProjectsPage.scss';

export default function ProjectsPage() {
  const projects = useAtomValue(displayProjectsAtom);

  return (
    <article className="content project-page">
      <div className="section-heading">
        <h1 id="projects">Projects</h1>
        <TagFilters />
      </div>
      <div className="content-inner">
        {projects.length === 0 && (
          <p
            style={{
              marginTop: 40,
              fontStyle: 'italic',
              fontSize: 14,
            }}
          >
            No projects found, please select more tags.
          </p>
        )}
        <div className="projects-wrapper">
          {projects.map((proj) => (
            <Project key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </article>
  );
}
