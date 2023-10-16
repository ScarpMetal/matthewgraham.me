import { Helmet } from "react-helmet";

import { useAtomValue } from "jotai";
import { displayExperiencesAtom } from "~/atoms";
import { SocialSidebar } from "../socials";
import { TagFilters } from "../tags";
import Experience from "./Experience";

import "./ExperiencesPage.scss";

export default function ExperiencesPage() {
  const experiences = useAtomValue(displayExperiencesAtom);

  return (
    <>
      <SocialSidebar />
      <aside className="timeline-scrollbar"></aside>
      <article className="content">
        <Helmet>
          <title>Experience - MatthewGraham.me</title>
          <meta
            name="description"
            content="Work experience that Matthew Graham has had over the years!"
          />
        </Helmet>
        <h1>Experience</h1>
        <TagFilters />
        {experiences.length === 0 && (
          <p
            style={{
              marginTop: 40,
              fontStyle: "italic",
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
    </>
  );
}
