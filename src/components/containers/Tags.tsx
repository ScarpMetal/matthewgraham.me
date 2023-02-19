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
}: {
  prepend?: any;
  tags: TagType[];
  append?: any;
  listKey: string;
  shortenLabel?: boolean;
  onSelectTag?: (tag: TagType) => void;
  globallyLinked?: boolean;
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
