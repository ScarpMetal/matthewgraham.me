import React, { useState } from 'react'
import provider from 'immer'

import Tags from '../containers/Tags'
import './EditableItemInputs.scss'
import { isEqual } from '../../global/utils'

export function TagsInput(props) {
	const [isFocused, setFocus] = useState(false)
	const classes = []
	if (!isEqual(props.originalTags, props.tags)) {
		classes.push('has-changes')
	}
	if (isFocused) {
		classes.push('focused')
	}

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
		setTagText('')
		props.onChange(newTags)
	}

	function onKeyDown(e) {
		if (e.keyCode === 8 && tagText === '' && props.tags && props.tags.length) {
			handleExistingTagSelect(props.tags[props.tags.length - 1])
		} else if (e.keyCode === 9 && tagText !== '' && recommended.length) {
			handleRecommendedTagSelect(recommended[0])
			e.preventDefault()
		} else if (e.keyCode === 13 && recommended.length) {
			handleRecommendedTagSelect(recommended[0])
		}
	}

	const styles = { fontSize: props.fontSize }
	return (
		<div className='editable-item-tags-input'>
			<h2>{props.name}</h2>
			<div className={`input-border ${classes.join(' ')}`}>
				<Tags tags={props.tags} onSelectTag={handleExistingTagSelect} />
				<div style={{ position: 'relative', flex: 1 }}>
					<input type='text' value={tagText}
						onChange={e => setTagText(e.target.value)}
						onKeyDown={onKeyDown}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
						style={styles}
					/>
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
	const [isFocused, setFocus] = useState(false)

	const classes = []
	if (!isEqual(props.originalValue, props.value)) {
		classes.push('has-changes')
	}
	if (isFocused) {
		classes.push('focused')
	}
	return (
		<div className='editable-item-text-input'>
			<h2>{props.name}</h2>
			<div className={`input-border ${classes.join(' ')}`} >
				<input type='text' value={props.value}
					onChange={props.onChange}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					style={styles}
				/>
			</div>
		</div>
	)
}
