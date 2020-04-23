/**
 * Compares two values of any type to see if they are equal
 * @param {*} original 
 * @param {*} value 
 */
export function isEqual(original, value) {
	if (Array.isArray(original) && Array.isArray(value)) {
		return original.length === value.length && !original.some((item, i) => !isEqual(item, value[i]))
	}
	if (typeof original === 'object' && typeof value === 'object') {
		if (Object.keys(original).length !== Object.keys(value).length) {
			return false
		}

		for (let key in original) {
			if (!isEqual(original[key], value[key])) {
				return false
			}
		}
		return true
	}
	return original === value
}

/**
 * Moves item from source index to destination index based on its sort_order
 * @param {Object[]} sortedList
 * @param {number} sortedList[].sort_order
 * @param {number} source 
 * @param {number} destination 
 */
export function reorderItems(sortedList, source, destination) {
	if (source === destination) return sortedList
	// Finds item index to remove
	const removeIndex = sortedList.findIndex(item => item.sort_order === source)
	// Create a new list
	const newList = [...sortedList]
	// Remove that item from the new list
	const [removedItem] = newList.splice(removeIndex, 1)
	// Finds index to re-insert removed item
	const insertIndex = newList.findIndex(item => item.sort_order === destination) +
		(source < destination ? 1 : 0)
	// Insert removed item in newlist
	newList.splice(insertIndex, 0, removedItem)

	return newList
}
