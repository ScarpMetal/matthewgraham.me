import { Tags } from "../tags";
import "./Experience.scss";

export default function Experience({
  experience,
}: {
  experience: ExperienceType;
}) {
  const hasImages = experience.images && !!experience.images.length;

  return (
    <div className="experience">
      <h2>{experience.title}</h2>
      <p className="info">
        {experience.sourceName && experience.sourceUrl ? (
          <a href={experience.sourceUrl} target="_blank" rel="noreferrer">
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
        tagIds={experience.tagIds}
      />
      {hasImages && (
        <div className="images">
          {experience.images.map((image) => (
            <span key={image.url}>
              <img src={image.url} alt={image.alt} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
