import Tags from "./containers/Tags";
import "./Experience.scss";

export default function Experience({
  experienceId,
}: {
  experienceId: ExperienceId;
}) {
  const experience: ExperienceType = {} as ExperienceType; // TODO: Get experience from experience Id
  const tags: TagType[] = []; // TODO: Get tags
  const hasImages = experience.images && !!experience.images.length;
  return (
    <div className="experience">
      <h2>{experience.title}</h2>
      <p className="info">
        {experience.sourceName && experience.sourceUrl ? (
          <a href={experience.sourceUrl} target="_blank">
            {experience.sourceName}
          </a>
        ) : (
          <span>{experience.sourceName}</span>
        )}
        {experience.sourceName && experience.dateInfo && (
          <span>&nbsp;•&nbsp;</span>
        )}
        {experience.dateInfo}
      </p>
      <p className="description">{experience.description}</p>
      <Tags
        listKey="experience-item"
        shortenLabel={true}
        tags={tags}
        globallyLinked={true}
      />
      {hasImages && (
        <div className="images">
          {experience.images.map((image) => (
            <span key={image.path}>
              <img src={image.url} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
