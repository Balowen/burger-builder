import React, { Component } from 'react'

import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	}

	orderHandler = (event) => {
		event.preventDefault()

		this.setState({ loading: true })
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Bart Nawoj',
				address: {
					street: 'testtest 1',
					zipCode: '12341',
					country: 'Poland',
				},
				email: 'test@test.com',
			},
			deliveryMethod: 'fastest',
		}
		axios
			.post('/orders.json', order)
			.then((response) => {
				this.setState({ loading: false })
				this.props.history.push('/')
			})
			.catch((error) => {
				this.setState({ loading: false })
			})
	}

	render() {
		let form = (
			<form>
				<Input
					inputtype="input"
					type="text"
					name="name"
					placeholder="Your name"
				/>
				<Input
					inputtype="input"
					type="text"
					name="email"
					placeholder="Your email"
				/>
				<Input
					inputtype="input"
					type="text"
					name="street"
					placeholder="Your street"
				/>
				<Input
					inputtype="input"
					type="text"
					name="postal"
					placeholder="Your postal"
				/>
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		)
		if (this.state.loading) {
			form = <Spinner />
		}
		return (
			<div className={classes.ContactData}>
				<h4>Ented your Contact Data</h4>
				{form}
			</div>
		)
	}
}

export default ContactData
