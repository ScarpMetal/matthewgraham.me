import * as tagActions from "../../actions/tagActions";
import Tag from "../Tag";
import Tags from "./Tags";

export default function TagFilters() {
  const tags: TagType[] = []; // TODO: Get all tags
  const allSelected: boolean = true; // TODO: derive this from jotai atoms

  const handleTagSelect = (tag: TagType) => {
    tagActions.filterSelectTag(tag.id);
    // TODO: Handle Tag Filter
  };

  const filterUnselectAllTags = () => {};

  const filterSelectAllTags = () => {};
  return (
    <div style={{ display: "flex" }}>
      <Tags
        append={
          <Tag
            listKey="tag-filter"
            tag={{
              id: "show-all-button",
              name: allSelected ? "Hide All" : "Select All",
              color: "transparent",
            }}
            onSelectTag={() => {
              if (allSelected) {
                filterUnselectAllTags();
              } else {
                filterSelectAllTags();
              }
            }}
          />
        }
        listKey="tag-filter"
        tags={tags}
        onSelectTag={handleTagSelect}
        globallyLinked={true}
      />
    </div>
  );
}
