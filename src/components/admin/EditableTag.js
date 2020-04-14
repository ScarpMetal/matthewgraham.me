import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import Tag from '../Tag'
import TagEditModal from './TagEditModal'
import { selectTag } from '../../actions/tagActions'
import './EditableTag.scss'

class EditableTag extends React.Component {
	constructor(props) {
		super(props)

		this.closeModal = this.closeModal.bind(this)
	}

	render() {
		const {
			tag, onSave, onDelete,
			selectTag, isEditing, isDeleting,
			selectedTagId
		} = this.props
		const isSelected = selectedTagId === tag.id

		return (
			<div className='editable-tag-wrapper'>
				<Tag tag={tag}
					onSelectTag={id => selectTag(id)}
					isLoading={(isEditing || isDeleting)}
				/>
				{isSelected &&
					<TagEditModal
						tag={tag}
						onDismiss={() => this.closeModal()}
						onDelete={() => {
							onDelete()
							this.closeModal()
						}}
						onSave={data => {
							onSave(data)
							this.closeModal()
						}}
					/>
				}
			</div>
		)
	}

	closeModal() {
		this.props.selectTag(null)
	}
}

function mapStateToProps(state) {
	return {
		selectedTagId: state.tags.selectedTagId,
		isEditing: state.tags.isEditing,
		isDeleting: state.tags.isDeleting
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectTag: id => dispatch(selectTag(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableTag)
