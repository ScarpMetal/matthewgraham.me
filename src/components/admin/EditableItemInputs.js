import React, { useState } from 'react'
import provider from 'immer'

import Tags from '../containers/Tags'
import './EditableItemInputs.scss'

export function TagsInput(props) {
	const [tagText, setTagText] = useState('')
	const availableTags = props.tags ? props.options.filter(tag => props.tags.indexOf(tag) === -1) : props.options
	const recommended = availableTags.filter(tag => tag.toLowerCase().includes(tagText.toLowerCase()))

	function handleExistingTagSelect(tagName) {
		const indexToRemove = props.tags.indexOf(tagName)
		const newTags = provider(props.tags, draft => {
			draft.splice(indexToRemove, 1)
		})
		props.onChange(newTags)
	}

	function handleRecommendedTagSelect(tagName) {
		const newTags = provider(props.tags, draft => {
			if (!draft) {
				return [tagName]
			}
			draft.push(tagName)
		})
		props.onChange(newTags)
	}

	const styles = { fontSize: props.fontSize }
	return (
		<div className='editable-item-tags-input'>
			<h2>{props.name}</h2>
			<div className='input-border'>
				<Tags tags={props.tags} onSelectTag={handleExistingTagSelect} />
				<div style={{ position: 'relative', flex: 1 }}>
					<input type='text' value={tagText} onChange={e => setTagText(e.target.value)} style={styles} />
					{recommended.length > 0 &&
						<div className='suggestions'>
							<Tags tags={recommended} onSelectTag={handleRecommendedTagSelect} />
						</div>
					}
				</div>
			</div>

		</div>
	)
}

export function TextInput(props) {
	const styles = { fontSize: props.fontSize }

	return (
		<div className='editable-item-text-input'>
			<h2>{props.name}</h2>
			<div className='input-border'>
				<input type='text' value={props.value} onChange={props.onChange} style={styles} />
			</div>
		</div>
	)
}
