import React, { useState } from 'react'
import { connect } from 'react-redux'

import hamburgerSVG from '../../assets/hamburger.svg'
import tagIcon from '../../assets/tag.svg'
import imgIcon from '../../assets/img.svg'
import delIcon from '../../assets/delete.svg'
import { TextInput, TagsInput } from './EditableInputs'
import { isEqual } from '../../global/utils'
import './EditableItem.scss'


class EditableItem extends React.Component {

	constructor(props) {
		super(props)

		this.state = this.originalState()

		this.originalState = this.originalState.bind(this)
	}

	originalState() {
		const { item } = this.props
		return {
			title: item.title || '',
			source_name: item.source_name || '',
			source_url: item.source_url || '',
			date_info: item.date_info || '',
			description: item.description || '',
			tags: item.tags || [],
			images: item.images || [],
			sort_order: item.sort_order === undefined ? Infinity : item.sort_order
		}
	}

	render() {
		const { item, selected, isEditing, isDeleting, onSelect, onDelete } = this.props
		const { id, ...comparableItem } = item

		const containsChanges = !isEqual(comparableItem, this.state)

		let containerStyle = {}
		if (selected) {
			containerStyle = { ...containerStyle, backgroundColor: 'rgba(255, 255, 255, .05)' }
		}
		if (isEditing || isDeleting) {
			containerStyle = { ...containerStyle, opacity: 0.1 }
		}

		return (
			<>
				{(isEditing || isDeleting) &&
					<p className='loading-message'>{isDeleting ? 'Deleting' : 'Saving'}...</p>
				}
				<div className='editable-item' style={containerStyle}>
					<div className={`info-row ${containsChanges ? 'contains-changes' : ''}`} onClick={onSelect}>
						<button className='hamburger'><img src={hamburgerSVG} /></button>
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
						<button className='delete' onClick={onDelete}><img src={delIcon} /></button>
					</div>
					{selected && !isDeleting && this.renderForm(containsChanges)}
				</div>
			</>
		)
	}

	renderForm(containsChanges) {
		const { item, onSave, onCancel } = this.props
		const { title, source_name, source_url, date_info, description, tags, images } = this.state

		return (
			<div className='form'>
				<TextInput
					name='Title'
					fontSize={24}
					value={title}
					originalValue={item.title}
					placeholder='My Great Project'
					onChange={e => this.setState({ title: e.target.value || '' })}
				/>
				<div style={{ display: 'flex' }}>
					<TextInput
						name='Source Name'
						fontSize={14}
						value={source_name}
						originalValue={item.source_name}
						placeholder='Codepen.io'
						onChange={e => this.setState({ source_name: e.target.value || '' })}
					/>
					<TextInput
						name='Source URL'
						fontSize={14}
						value={source_url}
						originalValue={item.source_url}
						placeholder='https://www.example.com/'
						onChange={e => this.setState({ source_url: e.target.value || '' })}
					/>
					<TextInput
						name='Date'
						fontSize={14}
						value={date_info}
						originalValue={item.date_info}
						placeholder='Jan-Mar 2020'
						onChange={e => this.setState({ date_info: e.target.value || '' })}
					/>
				</div>
				<TextInput
					name='Description'
					fontSize={14}
					value={description}
					originalValue={item.description}
					placeholder=''
					onChange={e => this.setState({ description: e.target.value || '' })}
				/>
				<TagsInput
					name='Tags'
					fontSize={14}
					options={this.props.allTags}
					tags={tags}
					originalTags={item.tags}
					onChange={tags => this.setState({ tags: tags ? tags : [] })}
				/>
				<div style={{ display: 'flex', marginTop: 40, paddingBottom: 10 }}>
					<button type='button' className='save-button'
						disabled={!containsChanges}
						onClick={() => onSave({ ...this.state })}
						title={containsChanges ? 'Save your work!' : 'There are no changes to save.'}
					>Save</button>
					<button type='button' className='cancel-button'
						onClick={() => {
							this.setState(this.originalState())
							onCancel()
						}}
					>Cancel</button>
				</div>
			</div>
		)
	}
}

EditableItem.defaultProps = {
	expanded: false,
	item: null
}

function mapStateToProps(state) {
	const tags = []
	for (let id in state.tags.data) {
		tags.push(state.tags.data[id])
	}
	tags.sort((a, b) => a.sort_order - b.sort_order)
	return {
		allTags: tags
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectProject: index => dispatch(selectProject(index)),
		selectExperience: index => dispatch(selectExperience(index)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableItem)
