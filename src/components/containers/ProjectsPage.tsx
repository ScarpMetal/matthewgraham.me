import { Helmet } from "react-helmet";

import Project from "../Project";
import SocialSidebar from "../SocialSidebar";
import TagFilters from "./TagFilters";

import "./ProjectsPage.scss";

export default function ProjectsPage({
  projects,
}: {
  projects: ProjectType[];
}) {
  return (
    <>
      <SocialSidebar />
      <aside className="timeline-scrollbar"></aside>
      <article className="content">
        <Helmet>
          <title>Projects - MatthewGraham.me</title>
          <meta
            name="description"
            content="Some of Matthew Graham's best and most successful personal projects!"
          />
        </Helmet>
        <h1>Projects</h1>
        <TagFilters />
        {projects.length === 0 && (
          <p
            style={{
              marginTop: 40,
              fontStyle: "italic",
              fontSize: 14,
            }}
          >
            No projects found, please select more tags.
          </p>
        )}
        <div className="projects-wrapper">
          {projects.map((proj, i) => (
            <Project key={proj.id} project={proj} />
          ))}
        </div>
      </article>
    </>
  );
}
