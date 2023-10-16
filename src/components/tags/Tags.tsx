import { useAtomValue } from "jotai";
import { ReactNode, useMemo } from "react";
import { tagsAtom } from "~/atoms";
import Tag from "./Tag";
import "./Tags.scss";

export default function Tags({
  prepend,
  tagIds,
  append,
  listKey,
  shortenLabel,
  onSelectTag,
}: {
  prepend?: ReactNode | ReactNode[];
  tagIds: TagId[];
  append?: ReactNode | ReactNode[];
  listKey: string;
  shortenLabel?: boolean;
  onSelectTag?: (tag: TagType) => void;
}) {
  const allTags = useAtomValue(tagsAtom);
  const tags = useMemo(() => {
    return tagIds
      .map((id) => allTags.find((tag) => tag.id === id))
      .filter((x): x is TagType => Boolean(x));
  }, [allTags, tagIds]);

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
        />
      ))}
      {append ? append : ""}
    </ul>
  );
}
