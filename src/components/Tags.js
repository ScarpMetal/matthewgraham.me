import React from 'react'

import './Tags.scss'

function Tags(props) {
	return (
		<ul className='tags'>
			<li><input type='checkbox' id='tag0' checked /><label class='tag' for='tag0'>Featured</label></li>
			<li><input type='checkbox' id='tag1' checked /><label class='tag' for='tag1'>Python</label></li>
			<li><input type='checkbox' id='tag2' checked /><label class='tag' for='tag2'>Javascript</label></li>
			<li><input type='checkbox' id='tag3' checked /><label class='tag' for='tag3'>SQL</label></li>
		</ul>
	)
}

export default Tags
