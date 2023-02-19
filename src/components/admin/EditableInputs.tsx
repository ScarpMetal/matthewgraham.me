import provider from "immer";
import { ChangeEventHandler, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import deleteSVG from "../../assets/delete.svg";
import { isEqual } from "../../global/utils";
import Tags from "../containers/Tags";
import "./EditableInputs.scss";

/*
	Tags Input
*/
export function TagsInput({
  name,
  tags,
  originalTags,
  options,
  onChange,
  fontSize,
  elRef,
}: {
  name: string;
  tags: TagType[];
  originalTags: TagType[];
  options: TagType[];
  onChange: (tags: TagType[]) => void;
  fontSize: number;
  elRef: React.LegacyRef<HTMLInputElement>;
}) {
  const [isFocused, setFocus] = useState(false);
  const [tagText, setTagText] = useState("");

  // Find which tags should be recommended
  const availableOptions = tags
    ? options.filter((o) => tags.findIndex((t) => t.id === o.id) === -1)
    : options;
  const recommended: TagType[] = availableOptions.filter((o) => {
    return o.name.toLowerCase().includes(tagText.toLowerCase());
  });

  // Deletes tag from the list
  function handleExistingTagSelect(tag: TagType) {
    const indexToRemove = tags.findIndex((t) => t.id === tag.id);
    const newTags = provider(tags, (draft) => {
      draft.splice(indexToRemove, 1);
    });
    onChange(newTags);
  }

  // Add the first recommended tag
  function handleRecommendedTagSelect(tag: TagType) {
    const newTags: TagType[] = provider(tags, (draft: TagType[]) => {
      if (!draft) {
        return [tag];
      }
      draft.push(tag);
      return draft;
    });

    setTagText("");
    onChange(newTags);
  }

  // Keyboard shortcuts
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.keyCode === 8 && tagText === "" && tags && tags.length) {
      handleExistingTagSelect(tags[tags.length - 1]);
    } else if (e.keyCode === 9 && tagText !== "" && recommended.length) {
      handleRecommendedTagSelect(recommended[0]);
      e.preventDefault();
    } else if (e.keyCode === 13 && recommended.length) {
      handleRecommendedTagSelect(recommended[0]);
    }
  };

  // Conditional Styling
  const classes = [];
  if (!isEqual(originalTags, tags)) {
    classes.push("has-changes");
  }
  if (isFocused) {
    classes.push("focused");
  }

  const inputStyles = { fontSize: fontSize };
  return (
    <div className="editable-item-tags-input">
      <h2 className={classes.join(" ")}>{name}</h2>
      <div className={`input-border ${classes.join(" ")}`}>
        <Tags
          listKey="existing-tag-input-tags"
          tags={tags}
          onSelectTag={handleExistingTagSelect}
        />
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            value={tagText}
            ref={elRef}
            onChange={(e) => setTagText(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            style={inputStyles}
          />
          {recommended.length > 0 && (
            <div className="suggestions">
              <Tags
                listKey="recommended-tag-input-tags"
                tags={recommended}
                onSelectTag={handleRecommendedTagSelect}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/*
	Text Input
*/
export function TextInput({
  name,
  value,
  originalValue,
  placeholder,
  fontSize,
  onChange,
  elRef,
}: {
  name: string;
  value: string;
  originalValue: string;
  placeholder?: string;
  fontSize: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  elRef?: React.RefObject<HTMLInputElement>;
}) {
  const styles = { fontSize: fontSize };
  const [isFocused, setFocus] = useState(false);

  const classes = [];
  if (!isEqual(originalValue, value)) {
    classes.push("has-changes");
  }
  if (isFocused) {
    classes.push("focused");
  }
  return (
    <div className="editable-item-text-input">
      <h2 className={classes.join(" ")}>{name}</h2>
      <div className={`input-border ${classes.join(" ")}`}>
        <input
          type="text"
          value={value}
          ref={elRef}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={styles}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

/*
	Image Input
*/
export function ImageInput({
  name,
  images,
  originalImages,
  onAdd,
  onRemove,
}: {
  name: string;
  images: ImageType[];
  originalImages: ImageType[];
  onAdd: (file: File) => void;
  onRemove: (path: string) => void;
}) {
  const onDrop = useCallback((files: File[]) => {
    files.forEach((file) => onAdd(file));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const classes = [];
  if (!isEqual(images, originalImages)) {
    classes.push("has-changes");
  }

  const wrapperClasses = [];
  if (!images.length) {
    wrapperClasses.push("no-images");
  }

  return (
    <div className="editable-item-image-input">
      <h2 className={classes.join(" ")}>{name}</h2>
      <div className={`image-container-wrapper ${wrapperClasses.join(" ")}`}>
        <div className="image-input-button" {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? "Drag file here" : "+ Upload an Image"}
        </div>
        <div className="images-container">
          {images &&
            images.map((image, i) => (
              <div className="image-container" key={image.path}>
                <button
                  className="delete-image"
                  onClick={() => {
                    onRemove(image.path);
                  }}
                >
                  <img src={deleteSVG} />
                </button>
                <img className="image" src={image.url} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
