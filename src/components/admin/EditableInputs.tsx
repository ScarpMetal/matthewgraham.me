import React, { useState, useCallback } from 'react'
import provider from 'immer'
import { useDropzone } from 'react-dropzone'

import deleteSVG from '../../assets/delete.svg'
import Tags from '../containers/Tags'
import './EditableInputs.scss'
import { isEqual } from '../../global/utils'

/*
	Tags Input
*/
export function TagsInput(props) {
	const { name, tags, originalTags, options, onChange, fontSize, elRef } = props
	const [isFocused, setFocus] = useState(false)
	const [tagText, setTagText] = useState('')

	// Find which tags should be recommended
	const availableOptions = tags ?
		options.filter(o => tags.indexOf(o.id) === -1) : options
	const recommended = availableOptions.filter(o => {
		return o.name.toLowerCase().includes(tagText.toLowerCase())
	}).map(o => o.id)

	// Deletes tag from the list
	function handleExistingTagSelect(id) {
		const indexToRemove = tags.indexOf(id)
		const newTags = provider(tags, draft => {
			draft.splice(indexToRemove, 1)
		})
		onChange(newTags)
	}

	// Add the first recommended tag
	function handleRecommendedTagSelect(id) {
		const newTags = provider(tags, draft => {
			if (!draft) {
				return [id]
			}
			draft.push(id)
		})

		setTagText('')
		onChange(newTags)
	}

	// Keyboard shortcuts
	function onKeyDown(e) {
		if (e.keyCode === 8 && tagText === '' && tags && tags.length) {
			handleExistingTagSelect(tags[tags.length - 1])
		} else if (e.keyCode === 9 && tagText !== '' && recommended.length) {
			handleRecommendedTagSelect(recommended[0])
			e.preventDefault()
		} else if (e.keyCode === 13 && recommended.length) {
			handleRecommendedTagSelect(recommended[0])
		}
	}

	// Conditional Styling
	const classes = []
	if (!isEqual(originalTags, tags)) {
		classes.push('has-changes')
	}
	if (isFocused) {
		classes.push('focused')
	}

	const inputStyles = { fontSize: fontSize }
	return (
		<div className='editable-item-tags-input'>
			<h2 className={classes.join(' ')}>{name}</h2>
			<div className={`input-border ${classes.join(' ')}`}>
				<Tags listKey='existing-tag-input-tags' tags={tags} onSelectTag={handleExistingTagSelect} />
				<div style={{ position: 'relative', flex: 1 }}>
					<input type='text' value={tagText}
						ref={elRef}
						onChange={e => setTagText(e.target.value)}
						onKeyDown={onKeyDown}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
						style={inputStyles}
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

/*
	Text Input
*/
export function TextInput(props) {
	const { name, value, originalValue, placeholder, fontSize, onChange, elRef } = props
	const styles = { fontSize: fontSize }
	const [isFocused, setFocus] = useState(false)

	const classes = []
	if (!isEqual(originalValue, value)) {
		classes.push('has-changes')
	}
	if (isFocused) {
		classes.push('focused')
	}
	return (
		<div className='editable-item-text-input'>
			<h2 className={classes.join(' ')}>{name}</h2>
			<div className={`input-border ${classes.join(' ')}`} >
				<input type='text' value={value}
					ref={elRef}
					onChange={onChange}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					style={styles}
					placeholder={placeholder}
				/>
			</div>
		</div>
	)
}

/*
	Image Input
*/
export function ImageInput(props) {
	const { name, images, originalImages, onAdd, onRemove } = props

	const onDrop = useCallback(files => {
		files.forEach(file => onAdd(file))
	}, [])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	const classes = []
	if (!isEqual(images, originalImages)) {
		classes.push('has-changes')
	}

	const wrapperClasses = []
	if (!images.length) {
		wrapperClasses.push('no-images')
	}

	return (
		<div className='editable-item-image-input'>
			<h2 className={classes.join(' ')}>{name}</h2>
			<div className={`image-container-wrapper ${wrapperClasses.join(' ')}`}>
				<div className='image-input-button' {...getRootProps()}>
					<input {...getInputProps()} />
					{isDragActive ? 'Drag file here' : '+ Upload an Image'}
				</div>
				<div className='images-container'>
					{images && images.map((image, i) =>
						<div className='image-container' key={image.path}>
							<button className='delete-image' onClick={() => { onRemove(image.path) }}>
								<img src={deleteSVG} />
							</button>
							<img className='image' src={image.url} />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
