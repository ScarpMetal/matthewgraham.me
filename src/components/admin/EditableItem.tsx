import { useCallback, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

import delIcon from "../../assets/delete.svg";
import hamburgerSVG from "../../assets/hamburger.svg";
import imgIcon from "../../assets/img.svg";
import tagIcon from "../../assets/tag.svg";
import { isEqual } from "../../global/utils";
import { ImageInput, TagsInput, TextInput } from "./EditableInputs";
import "./EditableItem.scss";

function EditableItem({
  item,
  index,
  selected,
  onSelect,
  onDelete,
  onSave,
  onCancel,
  onUpload,
  deleteFile,
}: {
  item: ProjectType | ExperienceType;
  index: number;
  selected: boolean;
}) {
  const [title, setTitle] = useState(item.title || "");
  const [sourceName, setSourceName] = useState(item.sourceName || "");
  const [sourceUrl, setSourceURL] = useState(item.sourceUrl || "");
  const [dateInfo, setDateInfo] = useState(item.dateInfo || "");
  const [description, setDescription] = useState(item.description || "");
  const [tags, setTags] = useState(item.tags || []);
  const [images, setImages] = useState(item.images || []);

  const allTags = useSelector((state) => {
    const tags = [];
    for (let id in state.tags.data) {
      tags.push(state.tags.data[id]);
    }
    tags.sort((a, b) => a.sort_order - b.sort_order);

    return tags;
  });

  // Function to fully reset the component state back to its initial state
  const resetState = useCallback(() => {
    setTitle(item.title || "");
    setSourceName(item.sourceName || "");
    setSourceURL(item.sourceUrl || "");
    setDateInfo(item.dateInfo || "");
    setDescription(item.description || "");
    setTags(item.tags || []);
    setImages(item.images || []);
  }, [item]);

  // Detect if item has changes
  const { id, ...comparableItem } = item;
  const containsChanges = !isEqual(comparableItem, {
    title,
    sourceName,
    sourceUrl,
    dateInfo,
    description,
    tags,
    images,
  });

  // Style the container
  let containerStyle = {};
  if (selected) {
    containerStyle = { backgroundColor: "rgba(255, 255, 255, .05)" };
  }

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div>
          <div
            className="editable-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{ ...provided.draggableProps.style, ...containerStyle }}
          >
            <div
              className={`info-row ${
                containsChanges ? "contains-changes" : ""
              }`}
            >
              <span className="hamburger" {...provided.dragHandleProps}>
                <img src={hamburgerSVG} />
              </span>
              <span className="date-info" onClick={onSelect}>
                {item.dateInfo}
              </span>
              <span className="title" onClick={onSelect}>
                {item.title}
              </span>
              <span className="description" onClick={onSelect}>
                {item.description}
              </span>
              <div className="item-tags" onClick={onSelect}>
                <span>{item.tags ? item.tags.length : 0}</span>
                <img src={tagIcon} />
              </div>
              <div className="item-images" onClick={onSelect}>
                <span>{item.images ? item.images.length : 0}</span>
                <img src={imgIcon} />
              </div>
              <button className="delete" onClick={onDelete}>
                <img src={delIcon} />
              </button>
            </div>
            {selected && (
              <div className="form">
                <TextInput
                  name="Title"
                  fontSize={24}
                  value={title}
                  originalValue={item.title}
                  placeholder="My Great Project"
                  onChange={(e) => setTitle(e.target.value || "")}
                />
                <div style={{ display: "flex" }}>
                  <TextInput
                    name="Source Name"
                    fontSize={14}
                    value={sourceName}
                    originalValue={item.sourceName}
                    placeholder="Codepen.io"
                    onChange={(e) => setSourceName(e.target.value || "")}
                  />
                  <TextInput
                    name="Source URL"
                    fontSize={14}
                    value={sourceUrl}
                    originalValue={item.sourceUrl}
                    placeholder="https://www.example.com/"
                    onChange={(e) => setSourceURL(e.target.value || "")}
                  />
                  <TextInput
                    name="Date"
                    fontSize={14}
                    value={dateInfo}
                    originalValue={item.dateInfo}
                    placeholder="Jan-Mar 2020"
                    onChange={(e) => setDateInfo(e.target.value || "")}
                  />
                </div>
                <TextInput
                  name="Description"
                  fontSize={14}
                  value={description}
                  originalValue={item.description}
                  placeholder=""
                  onChange={(e) => setDescription(e.target.value || "")}
                />
                <TagsInput
                  name="Tags"
                  fontSize={14}
                  options={allTags}
                  tags={tags}
                  originalTags={item.tags}
                  onChange={(tags) => setTags(tags)}
                />
                <ImageInput
                  name="Images"
                  images={images}
                  originalImages={item.images}
                  onAdd={(file) => {
                    return onUpload(file, (image) => {
                      setImages([...images, image]);
                    });
                  }}
                  onRemove={(imagePath) => {
                    if (
                      !item.images.find((image) => image.path === imagePath)
                    ) {
                      deleteFile(imagePath);
                    }

                    setImages(
                      images.filter((image) => image.path !== imagePath)
                    );
                  }}
                />
                <div
                  style={{ display: "flex", marginTop: 10, paddingBottom: 10 }}
                >
                  <button
                    type="button"
                    className="save-button"
                    disabled={!containsChanges}
                    onClick={() => {
                      // Delete images from the database who were removed in the modal
                      const toDelete = item.images.filter((originalImage) => {
                        return !images.some(
                          (image) => image.path === originalImage.path
                        );
                      });

                      toDelete.forEach((image) => deleteFile(image.path));

                      // Save state to database
                      onSave({
                        title,
                        sourceName,
                        sourceUrl,
                        dateInfo,
                        description,
                        tags,
                        images,
                        sort_order,
                      });
                    }}
                    title={
                      containsChanges
                        ? "Save your work!"
                        : "There are no changes to save."
                    }
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      // Delete images from the database who weren't saved
                      const toDelete = images.filter((image) => {
                        return !item.images.some(
                          (originalImage) => originalImage.path === image.path
                        );
                      });
                      toDelete.forEach((image) => deleteFile(image.path));

                      // Reset the state of the dropdown
                      resetState();
                      onCancel();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}

export default EditableItem;
