import Tags from "./containers/Tags";
import "./Project.scss";

function Project({ project }: { project: ProjectType }) {
  const hasImages = project.images && !!project.images.length;
  const tags: TagType[] = []; // TODO: get tags here
  return (
    <div className={`project ${hasImages ? "large" : ""}`}>
      <h2>{project.title}</h2>
      <p className="info">
        {project.sourceName && project.sourceUrl ? (
          <a href={project.sourceUrl} target="_blank">
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
        tags={tags}
        globallyLinked={true}
      />
      {hasImages && (
        <div className="images">
          {project.images.map((image) => (
            <span key={image.path}>
              <img src={image.url} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

Project.defaultProps = {
  project: {
    images: [],
  },
};

export default Project;
