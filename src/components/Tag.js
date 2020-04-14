import React from 'react'

import './Tag.scss'

function Tag(props) {
	const { tag, listKey, onSelectTag, globallyLinked, isLoading } = props
	let labelStyle = {}
	if (!globallyLinked || tag.selected) {
		labelStyle = { ...labelStyle, backgroundColor: tag.color }
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
			<label className='tag-label' htmlFor={isSelectable ? `${listKey}-tag-li-${tag.id}` : null}
				style={labelStyle}
			>{tag.name}</label>
		</li>
	)
}

Tag.defaultProps = {
	globallyLinked: false
}

export default Tag