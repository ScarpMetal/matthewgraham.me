import starSVG from "assets/star.svg";
import "./Tag.scss";

export default function Tag({
  tag,
  listKey = "tag-key",
  shortenLabel = false,
  onSelectTag,
  globallyLinked = false,
}: {
  tag: TagType;
  listKey?: string;
  shortenLabel?: boolean;
  onSelectTag?: (tag: TagType) => void;
  globallyLinked?: boolean;
}) {
  let labelStyle = {};
  const selected = true; // TODO: some function to get selected
  if (!globallyLinked || selected) {
    labelStyle = {
      ...labelStyle,
      backgroundColor: tag.color,
      color: "#b7b7b7",
    };
  }
  const isSelectable = !!onSelectTag;
  return (
    <li className="tag-li">
      {isSelectable && (
        <input
          type="checkbox"
          id={`${listKey}-tag-li-${tag.id}`}
          onChange={() => {
            onSelectTag(tag);
          }}
          checked={globallyLinked ? selected : true}
        />
      )}
      <label
        className={`tag-label ${isSelectable ? "selectable" : ""}`}
        htmlFor={isSelectable ? `${listKey}-tag-li-${tag.id}` : undefined}
        title={tag.name === "Featured" && shortenLabel ? tag.name : ""}
        style={labelStyle}
      >
        {tag.name === "Featured" && <img src={starSVG} />}
        {tag.name === "Featured" && shortenLabel ? "" : <span>{tag.name}</span>}
      </label>
    </li>
  );
}
