import { Tags } from "../tags";
import "./Project.scss";

function Project({ project }: { project: ProjectType }) {
  const hasImages = project.images && !!project.images.length;
  return (
    <div className={`project ${hasImages ? "large" : ""}`}>
      <h2>{project.title}</h2>
      <p className="info">
        {project.sourceName && project.sourceUrl ? (
          <a href={project.sourceUrl} target="_blank" rel="noreferrer">
            {project.sourceName}
          </a>
        ) : (
          <span>{project.sourceName}</span>
        )}
        {project.sourceName && project.dateInfo && <span>&nbsp;•&nbsp;</span>}
        {project.dateInfo}
      </p>
      <p className="description">{project.description}</p>
      <Tags
        listKey="project-item"
        shortenLabel={true}
        tagIds={project.tagIds}
      />
      {hasImages && (
        <div className="images">
          {project.images.map((image) => (
            <span key={image.url}>
              <img src={image.url} alt={image.alt} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Project;
