import React from 'react'
import {useDispatch} from 'react-redux'
import {Button, Form, Spinner} from 'react-bootstrap'
import {Formik} from 'formik'

export const AuthForm = (props) => {
	const dispatch = useDispatch()
  return (
    <Formik
			initialValues = {props.initial}
			validateOnBlur
			validationSchema={props.validationsSchema}
			onSubmit={(values) => dispatch(props.dispatchAction(values))}
			>
				{
					({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit,dirty}) => (
						<Form>
                {
                  Object.entries(values).map((t,k) => (
                    
                    <Form.Group key={k}>       
                      <Form.Label>{props.titles[t[0]]}</Form.Label>
                      <Form.Control 
                        type={t[0]} 
                        name={t[0]}
                        placeholder={`Введите ${props.titles[t[0]].toLowerCase()}`} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        value={values[t[0]]}
                        isInvalid={touched[t[0]] && errors[t[0]]}
                      />
                    <Form.Control.Feedback type="invalid">{errors[t[0]]}</Form.Control.Feedback>
                  </Form.Group>
                  ))
                }
							
							<Button variant="dark" className="w-100" onClick={handleSubmit} type="submit" disabled={!isValid && !dirty}>
								{props.isAuthLoading ? <Spinner animation="border" size="sm" variant="light" /> : props.button}
							</Button>			
						</Form>
					)
				}
		</Formik>
  )
}
