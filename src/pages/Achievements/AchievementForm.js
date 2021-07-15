import React, { Component } from 'react'
import { ModalForm } from './styles'


export default class extends Component {
	constructor({ selected, onSave }) {
		super()
		this.state = { ...selected }
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onSave = onSave
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({ [name]: value })
	}

	render() {
		return (
			<ModalForm>
				<h2> Name </h2>
				<input
					name="Name"
					type="text"
					value={this.state.Name}
					onChange={this.handleInputChange} />
				<h2> Details </h2>
				<label>Date:</label>
					<input
						name="Date"
						type="date"
						value={this.state.Date}
						onChange={this.handleInputChange} />
				<label>Type:</label>
					<select
						name="Type"
						value={this.state.Type}
						onChange={this.handleInputChange}>
						<option value="Competition">Competition</option>
						<option value="Masterclass">Masterclass</option>
						<option value="Online course">Online Course</option>
						<option value="Personal project">Personal Project</option>
						<option value="Reading">Reading</option>
						<option value="Work experience">Work experience</option>
						<option value="Other">Other</option>
					</select>

				<label>Attachment: </label>
				<input 
				  name="Attachment" 
				  type='file' 
				  onChange={this.state.Attachment}
				/>

				<h2>Description</h2>
				<input
					name="Description"
					type="text"
					value={this.state.Description}
					onChange={this.handleInputChange} />

				<br/>
				<button onClick={() => this.onSave(this.state)}>Done</button>
			</ModalForm>
		)
	}

}