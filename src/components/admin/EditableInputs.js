import React, { useState } from 'react'
import provider from 'immer'

import Tags from '../containers/Tags'
import './EditableInputs.scss'
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
	const availableOptions = props.tags ?
		props.options.filter(o => props.tags.indexOf(o.id) === -1) : props.options
	const recommended = availableOptions.filter(o => {
		return o.name.toLowerCase().includes(tagText.toLowerCase())
	}).map(o => o.id)

	function handleExistingTagSelect(id) {
		const indexToRemove = props.tags.indexOf(id)
		const newTags = provider(props.tags, draft => {
			draft.splice(indexToRemove, 1)
		})
		props.onChange(newTags)
	}

	function handleRecommendedTagSelect(id) {
		console.log('handleRecommendedTagSelect id', id)
		const newTags = provider(props.tags, draft => {
			if (!draft) {
				return [id]
			}
			draft.push(id)
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
				<Tags listKey='existing-tag-input-tags' tags={props.tags} onSelectTag={handleExistingTagSelect} />
				<div style={{ position: 'relative', flex: 1 }}>
					<input type='text' value={tagText}
						ref={props.elRef}
						onChange={e => setTagText(e.target.value)}
						onKeyDown={onKeyDown}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
						style={styles}
					/>
					{recommended.length > 0 &&
						<div className='suggestions'>
							<Tags listKey='recommended-tag-input-tags'
								tags={recommended}
								onSelectTag={handleRecommendedTagSelect}
							/>
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
					ref={props.elRef}
					onChange={props.onChange}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					style={styles}
					placeholder={props.placeholder}
				/>
			</div>
		</div>
	)
}
