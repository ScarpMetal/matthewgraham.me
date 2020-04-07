import React from 'react'

import hamburgerSVG from '../../assets/hamburger.svg'
import tagIcon from '../../assets/tag.svg'
import imgIcon from '../../assets/img.svg'
import delIcon from '../../assets/delete.svg'
import './EditableItem.scss'

function EditableItem(props) {
	const { item } = props
	return (
		<div className='editable-item' >
			<button classNam='hamburger'><img src={hamburgerSVG} /></button>
			<span className='date-info'>{item.date_info}</span>
			<span className='title'>{item.title}</span>
			<span className='description'>{item.description}</span>
			<div className='item-tags'>
				<span>{item.tags ? item.tags.length : 0}</span>
				<img src={tagIcon} />
			</div>
			<div className='item-images'>
				<span>{item.images ? item.images.length : 0}</span>
				<img src={imgIcon} />
			</div>
			<button className='delete'><img src={delIcon} /></button>
		</div>
	)
}

EditableItem.defaultProps = {
	expanded: false,
	item: null
}

export default EditableItem