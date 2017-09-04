import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import _ from 'lodash';

const FIELDS = {
	title: {
		id: 'title',
		type: 'input',
		dataType: 'text',
		label: 'Title For Post'
	},
	categories: {
		id: 'categories',
		type: 'input',
		dataType: 'text',
		label: 'Enter The Categories'
	},
	content: {
		id: 'content',
		type: 'text-area',
		dataType: 'text',
		label: 'Post Content'
	}
}

class App extends Component {

	onSubmit(props) { console.log('FORM SUBMITTED:', props) }

	renderField(field) {
		// es6 destructuring pulling off 3 constants:
		// const meta = field.meta;  const touched = field.meta.touched;  const error = field.meta.error;
		const { meta: { touched, error } } = field;
		const className = `form-group ${ (touched && error) ? 'has-danger' : ''}`;
		return (
			<div className={ className }>
				<label>{ field.label }</label>
				<input className="form-control" type={ field.type } { ...field.input }/>
				<div className="text-help"> { touched ? error : '' } </div>
			</div>
		)
	}

	field(fieldConfig, fieldKey) {
		return ( <Field key={fieldConfig.id} name={fieldConfig.id} label={fieldConfig.label} type={fieldConfig.type} component={ this.renderField }></Field> )
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<h1> Redux Form Example </h1>
				<form onSubmit={  handleSubmit( props => this.onSubmit(props) )  } >
					{ _.map(FIELDS, this.field.bind(this)) }
					<button type="submit" className="btn btn-primary"> Submit </button>
				</form>
			</div>
		)
	}
}

function validate(values) {
	const errors = {};

	_.each(FIELDS, (type, field) => {
		if(!values[field]) { errors[field] = `Enter a ${ field }` }
	});

	return errors;
}

export default reduxForm({
	form: 'PostNew', //this is the name of THIS form. we can have multiple forms this way. 
	fields: _.keys(FIELDS), // [title, categories, content]
	validate
})(App)