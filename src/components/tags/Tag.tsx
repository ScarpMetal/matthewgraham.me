import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import starSVG from '~/assets/star.svg';
import { selectedTagIdsAtom } from '~/atoms';
import './Tag.scss';

export default function Tag({
  tag,
  listKey = 'tag-key',
  shortenLabel = false,
  stateless = false,
  onSelectTag,
}: {
  tag: TagType;
  listKey?: string;
  shortenLabel?: boolean;
  stateless?: boolean;
  onSelectTag?: (tag: TagType) => void;
}) {
  const selectedTagIds = useAtomValue(selectedTagIdsAtom);
  const selected = useMemo(() => selectedTagIds.includes(tag.id), [selectedTagIds, tag]);
  let labelStyle = {};
  if (stateless || selected) {
    labelStyle = {
      ...labelStyle,
      backgroundColor: tag.color,
      color: tag.textColor,
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
          checked={selected}
        />
      )}
      <label
        className={`tag-label parallax-tag ${isSelectable ? 'selectable' : ''}`}
        htmlFor={isSelectable ? `${listKey}-tag-li-${tag.id}` : undefined}
        title={tag.name === 'Featured' && shortenLabel ? tag.name : ''}
        style={labelStyle}
      >
        {tag.name === 'Featured' && (
          <>
            {shortenLabel && <>&nbsp;</>}
            <img src={starSVG} alt="star" />
            {shortenLabel && <>&nbsp;</>}
          </>
        )}
        {tag.name === 'Featured' && shortenLabel ? '' : <span>{tag.name}</span>}
      </label>
    </li>
  );
}
