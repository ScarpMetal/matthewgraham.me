import { useEffect, useRef, useState } from "react";

import colorPickerSVG from "../../assets/color-picker.svg";
import { isEqual } from "../../global/utils";
import { TextInput } from "./EditableInputs";
import "./TagEditModal.scss";

function TagEditModal({
  tag,
  onDismiss,
  onSave,
  onDelete,
}: {
  tag: TagType;
  onDismiss: () => void;
  onSave: (partialTag: Partial<TagType>) => void;
  onDelete: () => void;
}) {
  const [name, setName] = useState(tag.name || "");
  const [color, setColor] = useState(tag.color || "");

  const modalRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  const isInUse = true; // TODO: derive this some other way
  // const isInUse = useSelector((state) => {
  //   const items = [...state.projects.data, ...state.experiences.data];
  //   return items.some((item) =>
  //     item.tags.some((itemTagId) => itemTagId === tag.id)
  //   );
  // });

  // Detect if there are changes from the original state
  const hasChanges = tag.name !== name || tag.color !== color;

  // Handle when the user clicks away
  useEffect(() => {
    function handleClickOutsideModal(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onDismiss();
      }
    }

    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [modalRef]);

  // Handle when the user presses enter
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (hasChanges && e.keyCode === 13) {
        onSave({ name, color });
      } else if (e.keyCode === 13) {
        onDismiss();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [name, color]);

  // Select the text input when modal opens
  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.select();
    }
  }, [textInputRef]);

  // Adds class to highlight save button if there are any changes
  const saveButtonClasses = [];
  if (hasChanges) {
    saveButtonClasses.push("can-save");
  }

  // Adds class to highlight color picker if the color was changed
  const colorPickerClasses = [];
  if (!isEqual(tag.color, color)) {
    colorPickerClasses.push("has-changed");
  }

  return (
    <div className="editable-tag-modal" ref={modalRef}>
      <button
        className="delete"
        disabled={isInUse}
        onClick={onDelete}
        title={isInUse ? "This tag is currently in use" : ""}
      >
        Delete
      </button>
      <TextInput
        name="Name"
        elRef={textInputRef}
        value={name}
        originalValue={tag.name}
        onChange={(e) => {
          setName(e.target.value || "");
        }}
        fontSize={14}
      />
      <div className="actions">
        <label
          id={`tag-color-${tag.id}`}
          className={`color-picker ${colorPickerClasses.join(" ")}`}
        >
          <input
            id={`tag-color-${tag.id}`}
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value || "");
            }}
          />
          <div style={{ backgroundColor: color }}>
            <img src={colorPickerSVG} />
          </div>
        </label>
        <button
          className={`save-button ${saveButtonClasses.join(" ")}`}
          disabled={!hasChanges}
          onClick={() => onSave({ name, color })}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default TagEditModal;
