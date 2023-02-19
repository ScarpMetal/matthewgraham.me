import { Draggable } from "react-beautiful-dnd";

import Tag from "../Tag";
import "./EditableTag.scss";
import TagEditModal from "./TagEditModal";

function EditableTag({
  tag,
  index,
  onSave,
  onDelete,
}: {
  tag: TagType;
  index: number;
  onSave: (partialTag: Partial<TagType>) => void;
  onDelete: () => void;
}) {
  const selectTag = (id: string | null) => {}; // TODO: implement
  const isSelected = false; // TODO: derive tag state from atoms
  return (
    <Draggable draggableId={tag.id} index={index}>
      {(provided) => (
        <div
          className="editable-tag-wrapper"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Tag tag={tag} onSelectTag={(tag) => selectTag(tag.id)} />
          {isSelected && (
            <TagEditModal
              tag={tag}
              onDismiss={() => selectTag(null)}
              onDelete={() => {
                onDelete();
                selectTag(null);
              }}
              onSave={(data) => {
                onSave(data);
                selectTag(null);
              }}
            />
          )}
          {/* TODO: Figure out why provided.placeholder is not being recognized */}
          {/* {provided.placeholder} */}
        </div>
      )}
    </Draggable>
  );
}

export default EditableTag;
