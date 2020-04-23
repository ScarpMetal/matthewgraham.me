import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import Tag from '../Tag'
import TagEditModal from './TagEditModal'
import { selectTag } from '../../actions/tagActions'
import './EditableTag.scss'

function EditableTag({ tag, onSave, onDelete }) {
	const dispatch = useDispatch()
	const isLoading = useSelector(state => state.tags.isEditing || state.tags.isDeleting)
	const selectedTagId = useSelector(state => state.tags.selectedTagId)
	const isSelected = selectedTagId === tag.id
	return (
		<Draggable
			draggableId={tag.id}
			index={tag.sort_order}
		>
			{provided =>
				<div
					className='editable-tag-wrapper'
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<Tag
						tag={tag}
						onSelectTag={id => dispatch(selectTag(id))}
						isLoading={isLoading}
					/>
					{isSelected &&
						<TagEditModal
							tag={tag}
							onDismiss={() => dispatch(selectTag(null))}
							onDelete={() => {
								onDelete()
								dispatch(selectTag(null))
							}}
							onSave={data => {
								onSave(data)
								dispatch(selectTag(null))
							}}
						/>
					}
					{provided.placeholder}
				</div>
			}
		</Draggable>
	)
}

export default EditableTag
