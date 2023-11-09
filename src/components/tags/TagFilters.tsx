import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useMemo } from 'react';
import { selectedTagIdsAtom, tagsAtom } from '~/atoms';
import Tag from './Tag';
import './TagFilters.scss';
import Tags from './Tags';

export default function TagFilters() {
  const tags = useAtomValue(tagsAtom);
  const tagIds = useMemo(() => tags.map((tag) => tag.id), [tags]);
  const [selectedTagIds, setSelectedTagIds] = useAtom(selectedTagIdsAtom);
  const allSelected = useMemo(() => !tags.some((tag) => !selectedTagIds.includes(tag.id)), [tags, selectedTagIds]);

  const handleTagSelect = useCallback(
    (tag: TagType) => {
      let nextSelectedTagIds = [...selectedTagIds];
      if (allSelected) {
        nextSelectedTagIds = [];
      }
      const selectedTagIndex = nextSelectedTagIds.findIndex((selectedTagId) => selectedTagId === tag.id);
      if (selectedTagIndex === -1) {
        nextSelectedTagIds.push(tag.id);
      } else {
        nextSelectedTagIds.splice(selectedTagIndex, 1);
      }
      setSelectedTagIds(nextSelectedTagIds);
    },
    [allSelected, selectedTagIds, setSelectedTagIds],
  );

  const filterUnselectAllTags = useCallback(() => {
    setSelectedTagIds([]);
  }, [setSelectedTagIds]);

  const filterSelectAllTags = useCallback(() => {
    setSelectedTagIds(tagIds);
  }, [setSelectedTagIds, tagIds]);

  return (
    <Tags
      className="tag-filters-container"
      data-all-selected={allSelected}
      append={
        <Tag
          listKey="tag-filter"
          tag={{
            id: 'show-all-button',
            name: allSelected ? 'Hide All' : 'Select All',
            color: 'transparent',
            textColor: '#B7B7B7',
          }}
          stateless
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
      tagIds={tagIds}
      onSelectTag={handleTagSelect}
    />
  );
}
