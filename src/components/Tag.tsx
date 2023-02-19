import React from 'react'

import starSVG from '../assets/star.svg'
import './Tag.scss'

function Tag(props) {
	const { tag, listKey, shortenLabel, onSelectTag, globallyLinked, isLoading } = props
	let labelStyle = {}
	if (!globallyLinked || tag.selected) {
		labelStyle = { ...labelStyle, backgroundColor: tag.color, color: tag.textColor ? tag.textColor : 'black' }
	}
	if (isLoading) {
		labelStyle = { ...labelStyle, opacity: 0.1 }
	}
	const isSelectable = !!onSelectTag
	return (
		<li className='tag-li'>
			{isSelectable && <input type='checkbox' id={`${listKey}-tag-li-${tag.id}`}
				onChange={() => { onSelectTag(tag.id) }}
				checked={globallyLinked ? tag.selected : true}
			/>}
			<label
				className={`tag-label ${isSelectable ? 'selectable' : ''}`}
				htmlFor={isSelectable ? `${listKey}-tag-li-${tag.id}` : null}
				title={tag.name === 'Featured' && shortenLabel ? tag.name : ''}
				style={labelStyle}
			>
				{tag.name === 'Featured' && <img src={starSVG} />}
				{(tag.name === 'Featured' && shortenLabel) ? '' : <span>{tag.name}</span>}
			</label>
		</li>
	)
}

Tag.defaultProps = {
	globallyLinked: false,
	shortenLabel: false
}

export default Tag
