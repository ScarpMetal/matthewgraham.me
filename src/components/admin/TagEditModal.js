import React, { useEffect, useRef, useState } from 'react'

import colorPickerSVG from '../../assets/color-picker.svg'
import { isEqual } from '../../global/utils'
import { TextInput } from './EditableInputs'
import './TagEditModal.scss'

function TagEditModal(props) {
	const { tag, onDismiss, onSave, onDelete } = props
	const [name, setName] = useState(tag.name || '')
	const [color, setColor] = useState(tag.color || '')
	const [error, setError] = useState(null)

	const modalRef = useRef(null)
	const textInputRef = useRef(null)

	const isInUse = false

	// Detect if there are changes from the original state
	const hasChanges = tag.name !== name || tag.color !== color

	// Handle when the user clicks away
	useEffect(() => {
		function handleClickOutsideModal(e) {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onDismiss()
			}
		}

		document.addEventListener('mousedown', handleClickOutsideModal)
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideModal)
		}
	}, [modalRef])

	// Handle when the user presses enter
	useEffect(() => {
		function handleKeydown(e) {
			if (hasChanges && e.keyCode === 13) {
				onSave({ name, color })
			} else if (e.keyCode === 13) {
				onDismiss()
			}
		}

		document.addEventListener('keydown', handleKeydown)
		return () => {
			document.removeEventListener('keydown', handleKeydown)
		}
	}, [name, color])

	// Select the text input when modal opens
	useEffect(() => {
		if (textInputRef.current) {
			textInputRef.current.select()
		}
	}, [textInputRef])

	// Adds class to highlight save button if there are any changes
	const saveButtonClasses = []
	if (hasChanges) {
		saveButtonClasses.push('can-save')
	}

	// Adds class to highlight color picker if the color was changed
	const colorPickerClasses = []
	if (!isEqual(tag.color, color)) {
		colorPickerClasses.push('has-changed')
	}

	return (
		<div className='editable-tag-modal' ref={modalRef}>
			<button className='delete'
				disabled={isInUse}
				onClick={onDelete}
			>Delete</button>
			<TextInput name='Name'
				elRef={textInputRef}
				value={name}
				originalValue={tag.name}
				onChange={e => { console.log('TextInput onChange', e.target.value); setName(e.target.value || '') }}
				fontSize={14}
			/>
			<div className='actions'>
				<label id={`tag-color-${tag.id}`} className={`color-picker ${colorPickerClasses.join(' ')}`}>
					<input id={`tag-color-${tag.id}`} type='color'
						value={color}
						onChange={e => { console.log('color picker change', e.target.value); setColor(e.target.value || '') }}
					/>
					<div style={{ backgroundColor: color }}>
						<img src={colorPickerSVG} />
					</div>
				</label>
				<button className={`save-button ${saveButtonClasses.join(' ')}`}
					disabled={!hasChanges}
					onClick={() => onSave({ name, color })}
				>Save</button>
			</div>
			{error && <p className='error'>{error}</p>}
		</div>
	)
}

export default TagEditModal
