import { Helmet } from "react-helmet";

import { SocialSidebar } from "../socials";
import { TagFilters } from "../tags";
import Project from "./Project";

import { useAtomValue } from "jotai";
import { displayProjectsAtom } from "~/atoms";
import "./ProjectsPage.scss";

export default function ProjectsPage() {
  const projects = useAtomValue(displayProjectsAtom);

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
          {projects.map((proj) => (
            <Project key={proj.id} project={proj} />
          ))}
        </div>
      </article>
    </>
  );
}
