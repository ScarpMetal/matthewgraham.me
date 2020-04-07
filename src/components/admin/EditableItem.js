import React, { useState } from 'react'
import { connect } from 'react-redux'
import provider from 'immer'

import hamburgerSVG from '../../assets/hamburger.svg'
import tagIcon from '../../assets/tag.svg'
import imgIcon from '../../assets/img.svg'
import delIcon from '../../assets/delete.svg'
import { TextInput, TagsInput } from './EditableItemInputs'
import './EditableItem.scss'

class EditableItem extends React.Component {

	constructor(props) {
		super(props)

		const { item } = props
		this.state = {
			title: item.title,
			source_name: item.source_name,
			source_url: item.source_url,
			date_info: item.date_info,
			description: item.description,
			tags: item.tags
		}
	}

	render() {
		const { item, selected, onSelect } = this.props
		const activeStyle = {
			backgroundColor: 'rgba(255, 255, 255, .05)'
		}
		return (
			<div className='editable-item' style={selected ? activeStyle : {}}>
				<div className='info-row' onClick={onSelect}>
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
					<button className='delete'><img src={delIcon} /></button>
				</div>
				{selected && this.renderForm()}
			</div>

		)
	}

	renderForm() {
		const { onCancel } = this.props
		const { title, source_name, source_url, date_info, description, tags } = this.state

		return (
			<div className='form'>
				<TextInput
					name='Title'
					fontSize={24}
					value={title}
					onChange={e => this.setState({ title: e.target.value })}
				/>
				<div style={{ display: 'flex' }}>
					<TextInput
						name='Source Name'
						fontSize={14}
						value={source_name}
						onChange={e => this.setState({ source_name: e.target.value })}
					/>
					<TextInput
						name='Source URL'
						fontSize={14}
						value={source_url}
						onChange={e => this.setState({ source_url: e.target.value })}
					/>
					<TextInput
						name='Date'
						fontSize={14}
						value={date_info}
						onChange={e => this.setState({ date_info: e.target.value })}
					/>
				</div>
				<TextInput
					name='Description'
					fontSize={14}
					value={description}
					onChange={e => this.setState({ description: e.target.value })}
				/>
				<TagsInput
					name='Tags'
					fontSize={14}
					options={this.props.allTags}
					tags={tags}
					onChange={tags => this.setState({ tags })}
				/>
				<div style={{ display: 'flex', marginTop: 32, paddingBottom: 10 }}>
					<button type='button' className='save-button'>Save</button>
					<button type='button' className='cancel-button' onClick={onCancel}>Cancel</button>
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
	for (let tagName in state.tags.data) {
		tags.push(tagName)
	}
	return {
		allTags: tags
	}
}

export default connect(mapStateToProps)(EditableItem)
