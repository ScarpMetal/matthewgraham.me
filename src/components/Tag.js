import React from 'react'

import './Tag.scss'

function Tag(props) {
	const { tag, isSelectable, onSelectTag } = props
	const checkedStyle = { backgroundColor: tag.color }
	return (
		<li key={tag.id} className='tag-li'>
			{isSelectable && <input type='checkbox' id={`tag_${tag.name}`}
				onChange={() => isSelectable && onSelectTag(tag.name)}
				checked={tag.selected}
			/>}
			<label className='tag-label' htmlFor={isSelectable ? `tag_${tag.name}` : null}
				style={tag.selected ? checkedStyle : {}}
			>{tag.name}</label>
		</li>
	)
}

export default Tag