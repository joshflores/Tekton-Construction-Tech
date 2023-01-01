import React, { useState, useEffect } from 'react';
import debug from 'debug';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import formSchema from '../schemaPath/contactSchema';
import emailServices from '../../services/emailService';
import toastr from 'toastr';
import ThemeProvider from 'react-bootstrap/ThemeProvider';

const _logger = debug.extend('contactPage');

const ContactForm = () => {
    let [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });

    let handleSubmit = (values) => {
        setFormData(values);
        emailService.sendEmail(formData).then(onPostEmailSuccess).catch(onPostEmailError);
    };

    let onPostEmailSuccess = (response) => {
        toastr['success']('Email Sent!', 'Message');
        _logger(response);
    };

    let onPostEmailError = (response) => {
        toastr['error']('Email Not Sent!', 'Error');
        _logger(response);
    };

    return (
        <>
            <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
                <div className="mt-5 container">
                    <div className="row">
                        <div className="formWrapper">
                            <Formik
                                enableReinitialize={true}
                                initialValues={formData}
                                onSubmit={handleSubmit}
                                validationSchema={formSchema}>
                                <Form>
                                    <div className="text-center contact">
                                        <h2 className="form-title">Contact Page</h2>
                                        <h5 className="form-writing">
                                            This is the Contact Page
                                        </h5>
                                    </div>
                                    <div className="row m-4">
                                        <div className="form-group col">
                                            <label htmlFor="firstName" className="contactFormLabels">
                                                First name <i className="formInputIcons mdi mdi-account mdi-24px"></i>
                                            </label>
                                            <div className="icon-wrap">
                                                <span className="Icon-inside">
                                                    <Field
                                                        type="text"
                                                        name="firstName"
                                                        className=" form-control"
                                                        placeholder="First name"
                                                    />
                                                </span>
                                            </div>
                                            <ErrorMessage component="div" name="firstName" className="has-error" />
                                        </div>
                                        <div className="form-group col">
                                            <label htmlFor="lastName" className="contactFormLabels">
                                                Last name <i className="formInputIcons mdi mdi-account mdi-24px"></i>
                                            </label>
                                            <div className="icon-wrap">
                                                <Field
                                                    type="text"
                                                    name="lastName"
                                                    className=" form-control"
                                                    placeholder="Last name"
                                                />
                                            </div>
                                            <ErrorMessage component="div" name="lastName" className="has-error" />
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="form-group col m-3">
                                            <label htmlFor="email" className="contactFormLabels">
                                                Email <i className="mdi mdi-email mdi-24px"></i>
                                            </label>
                                            <div className="icon-wrap">
                                                <Field
                                                    type="text col-sm-10"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                />
                                            </div>
                                            <ErrorMessage component="div" name="email" className="has-error" />
                                        </div>
                                        <div className="form-group col m-3">
                                            <label htmlFor="message" className="contactFormLabels">
                                                Message <i className="formInputIcons mdi mdi-send mdi-24px"></i>
                                            </label>
                                            <div className="icon-wrap formMessageTextBox">
                                                <Field
                                                    component="textarea"
                                                    name="message"
                                                    className="form-control"
                                                />
                                            </div>
                                            <ErrorMessage component="div" name="message" className="has-error" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="submitButton btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
};

export default ContactForm;
