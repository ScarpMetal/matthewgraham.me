import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import hamburgerSVG from '../../assets/hamburger.svg'
import tagIcon from '../../assets/tag.svg'
import imgIcon from '../../assets/img.svg'
import delIcon from '../../assets/delete.svg'
import { TextInput, TagsInput, ImageInput } from './EditableInputs'
import { isEqual } from '../../global/utils'
import './EditableItem.scss'


function EditableItem({
	item, selected,
	isEditing, isDeleting, isUploading,
	onSelect, onDelete,
	onSave, onCancel,
	onUpload, deleteFile
}) {
	const [title, setTitle] = useState(item.title || '')
	const [source_name, setSourceName] = useState(item.source_name || '')
	const [source_url, setSourceURL] = useState(item.source_url || '')
	const [date_info, setDateInfo] = useState(item.date_info || '')
	const [description, setDescription] = useState(item.description || '')
	const [tags, setTags] = useState(item.tags || [])
	const [images, setImages] = useState(item.images || [])
	const [sort_order, setSortOrder] = useState(item.sort_order !== undefined ? item.sort_order : Infinity)

	const allTags = useSelector(state => {
		const tags = []
		for (let id in state.tags.data) {
			tags.push(state.tags.data[id])
		}
		tags.sort((a, b) => a.sort_order - b.sort_order)

		return tags
	})

	// Function to fully reset the component state back to its initial state
	const resetState = useCallback(() => {
		setTitle(item.title || '')
		setSourceName(item.source_name || '')
		setSourceURL(item.source_url || '')
		setDateInfo(item.date_info || '')
		setDescription(item.description || '')
		setTags(item.tags || [])
		setImages(item.images || [])
		setSortOrder(item.sort_order !== undefined ? item.sort_order : Infinity)
	}, [item])

	// Reset sort_order if we recieve it in props
	useEffect(() => {
		setSortOrder(item.sort_order)
	}, [item.sort_order])

	// Detect if item has changes
	const { id, ...comparableItem } = item
	const containsChanges = !isEqual(comparableItem, {
		title,
		source_name, source_url, date_info,
		description,
		tags,
		images,
		sort_order
	})

	// Style the container
	let containerStyle = {}
	if (selected) {
		containerStyle = { backgroundColor: 'rgba(255, 255, 255, .05)' }
	}

	// Get loading message if loading
	let loadingMessage = null
	if (isEditing || isDeleting || isUploading) {
		containerStyle = { ...containerStyle, opacity: 0.1 }
		if (isEditing) {
			loadingMessage = 'Saving...'
		} else if (isDeleting) {
			loadingMessage = 'Deleting...'
		} else if (isUploading) {
			loadingMessage = 'Uploading...'
		}
	}

	return (
		<Draggable
			draggableId={item.id}
			index={item.sort_order}
		>
			{provided =>
				<div>
					{loadingMessage && <p className='loading-message'>{loadingMessage}</p>}
					<div
						className='editable-item'
						ref={provided.innerRef}
						{...provided.draggableProps}
						style={{ ...provided.draggableProps.style, ...containerStyle }}

					>
						<div className={`info-row ${containsChanges ? 'contains-changes' : ''}`}>
							<span
								className='hamburger'
								{...provided.dragHandleProps}
							>
								<img src={hamburgerSVG} />
							</span>
							<span className='date-info' onClick={onSelect}>{item.date_info}</span>
							<span className='title' onClick={onSelect}>{item.title}</span>
							<span className='description' onClick={onSelect}>{item.description}</span>
							<div className='item-tags' onClick={onSelect}>
								<span>{item.tags ? item.tags.length : 0}</span>
								<img src={tagIcon} />
							</div>
							<div className='item-images' onClick={onSelect}>
								<span>{item.images ? item.images.length : 0}</span>
								<img src={imgIcon} />
							</div>
							<button className='delete' onClick={onDelete}><img src={delIcon} /></button>
						</div>
						{selected && !isDeleting &&
							<div className='form'>
								<TextInput
									name='Title'
									fontSize={24}
									value={title}
									originalValue={item.title}
									placeholder='My Great Project'
									onChange={e => setTitle(e.target.value || '')}
								/>
								<div style={{ display: 'flex' }}>
									<TextInput
										name='Source Name'
										fontSize={14}
										value={source_name}
										originalValue={item.source_name}
										placeholder='Codepen.io'
										onChange={e => setSourceName(e.target.value || '')}
									/>
									<TextInput
										name='Source URL'
										fontSize={14}
										value={source_url}
										originalValue={item.source_url}
										placeholder='https://www.example.com/'
										onChange={e => setSourceURL(e.target.value || '')}
									/>
									<TextInput
										name='Date'
										fontSize={14}
										value={date_info}
										originalValue={item.date_info}
										placeholder='Jan-Mar 2020'
										onChange={e => setDateInfo(e.target.value || '')}
									/>
								</div>
								<TextInput
									name='Description'
									fontSize={14}
									value={description}
									originalValue={item.description}
									placeholder=''
									onChange={e => setDescription(e.target.value || '')}
								/>
								<TagsInput
									name='Tags'
									fontSize={14}
									options={allTags}
									tags={tags}
									originalTags={item.tags}
									onChange={tags => setTags(tags)}
								/>
								<ImageInput
									name='Images'
									images={images}
									originalImages={item.images}
									onAdd={file => {
										return onUpload(file, image => {
											setImages([...images, image])
										})
									}}
									onRemove={imagePath => {
										if (!item.images.find(image => image.path === imagePath)) {
											deleteFile(imagePath)
										}

										setImages(images.filter(image => image.path !== imagePath))
									}}
								/>
								<div style={{ display: 'flex', marginTop: 10, paddingBottom: 10 }}>
									<button type='button'
										className='save-button'
										disabled={!containsChanges}
										onClick={() => {
											// Delete images from the database who were removed in the modal
											const toDelete = item.images.filter(originalImage => {
												return !images.some(image => image.path === originalImage.path)
											})

											toDelete.forEach(image => deleteFile(image.path))

											// Save state to database
											onSave({
												title,
												source_name, source_url, date_info,
												description,
												tags,
												images,
												sort_order
											})
										}}
										title={containsChanges ? 'Save your work!' : 'There are no changes to save.'}
									>Save</button>
									<button type='button' className='cancel-button'
										onClick={() => {
											// Delete images from the database who weren't saved
											const toDelete = images.filter(image => {
												return !item.images.some(originalImage => originalImage.path === image.path)
											})
											toDelete.forEach(image => deleteFile(image.path))

											// Reset the state of the dropdown
											resetState()
											onCancel()
										}}
									>Cancel</button>
								</div>
							</div>
						}
					</div>
					{provided.placeholder}
				</div>
			}

		</Draggable>
	)
}

export default EditableItem
