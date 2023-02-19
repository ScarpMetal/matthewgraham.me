import Tag from "../Tag";
import "./Tags.scss";

export default function Tags({
  prepend,
  tags,
  append,
  listKey,
  shortenLabel,
  onSelectTag,
  globallyLinked,
}) {
  return (
    <ul className="tags-ul">
      {prepend ? prepend : ""}
      {tags.map((tag) => (
        <Tag
          key={`${listKey}-${tag.id}`}
          listKey={listKey}
          shortenLabel={shortenLabel}
          tag={tag}
          onSelectTag={onSelectTag}
          globallyLinked={globallyLinked}
        />
      ))}
      {append ? append : ""}
    </ul>
  );
}
