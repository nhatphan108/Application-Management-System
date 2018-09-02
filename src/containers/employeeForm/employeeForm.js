import React, { Component } from 'react';
import Input from '../../components/input/input';
import './employee.css';
import axios from '../../axios';
class EmployeeForm extends Component {
    state = {
        inputs: {
            name: {
                text: 'Name:',
                inputtype: 'text',
                attributes: {
                    placeholder: 'Your Name. Alphabet Characters. Length 5-15',
                    value: ''
                },
                validation: {
                    isValid: false,
                    rules: {
                        minLength: 5,
                        maxLength: 12,
                        isNumeric: false
                    }
                }

            },
            age: {
                text: 'Age:',
                inputtype: 'text',
                attributes: {
                    placeholder: 'Your Age. Numeric Characters. Length 1-3',
                    value: ''
                },
                validation: {
                    isValid: false,
                    rules: {
                        minLength: 1,
                        maxLength: 3,
                        isNumeric: true
                    }
                }

            },
            job: {
                text: 'Last Job:',
                inputtype: 'text',
                attributes: {
                    placeholder: 'Your Last Job. Alphabet Characters. Length 4-15',
                    value: ''
                },
                validation: {
                    isValid: false,
                    rules: {
                        minLength: 4,
                        maxLength: 15,
                        isNumeric: false
                    }
                }
            },
            biography: {
                text: 'Company:',
                inputtype: 'text',
                attributes: {
                    placeholder: 'Your Company',
                    value: ''
                },
            },
            gender: {
                text: 'Gender:',
                inputtype: 'select',
                attributes: {
                    value: 'Male',
                },
                options: [
                    {
                        value: 'Male',
                        displayValue: 'Male'
                    },
                    {
                        value: 'Female',
                        displayValue: 'Female'
                    }
                ]
            },
            qualifications: {
                text: 'Qualifications:',
                inputtype: 'textarea',
                attributes: {
                    value: '',
                    placeholder: 'Tell us why you are fit for this job'
                }

            }

        },
        isFormValid: false
    }

    verify = (value, rules) => {
        if (rules.minLength && value.length < rules.minLength) {
            return false
        }
        if (rules.maxLength && value.length > rules.maxLength) {
            return false
        }
        if (rules.isNumeric) {
            if (value != parseInt(value)) {
                return false
            }
        } else {
            if (value == parseInt(value)) {
                return false
            }
        }
        return true
    }
    valueChangeHandler = (event, mykey) => {
        const updatedInputs = { ...this.state.inputs };
        const element = { ...updatedInputs[mykey] };
        element.attributes.value = event.target.value;
        if (element.validation) {
            element.validation.isValid = this.verify(event.target.value, element.validation.rules)
        }
        updatedInputs[mykey] = element;
        let isFormValid = true;
        for (let key in updatedInputs) {
            if (updatedInputs[key].validation) {
                if (!updatedInputs[key].validation.isValid) {
                    isFormValid = false;
                    break;
                }
            }
        }

        this.setState({
            inputs: updatedInputs,
            isFormValid: isFormValid
        })

    }
    submissionHandler = (e) => {
        e.preventDefault();
        const inputs = [];
        for (let key in this.state.inputs) {
            inputs.push({
                id: this.state.inputs[key].text,
                value: this.state.inputs[key].attributes.value
            })
            const updatedInputs = { ...this.state.inputs };
            updatedInputs[key].attributes.value = '';
            this.setState({
                inputs: updatedInputs
            })
        }
        axios.post('inputs.json', inputs)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
    render() {
        let inputList = [];
        const buttonStyle = {
            height: '35px',
            width: 'auto',
            backgroundColor: 'gray',
            color: 'white',
            border: 'none',
            fontFamily: 'fantasy',
            fontWeight: '800',
            fontSize: ' 1.8em',
            marginBottom: '30px',
            cursor: 'pointer'
        };
        if (this.state.isFormValid) {
            buttonStyle.backgroundColor = '#d5ae41'
        }

        for (let key in this.state.inputs) {
            const singleObject = this.state.inputs[key];
            inputList.push({
                ...singleObject,
                key: key
            });
        }
        const form = inputList.map(eachInput =>
            <Input {...eachInput} changed={(event) => this.valueChangeHandler(event, eachInput.key)} />
        )
        return (
            <div>
                <form onSubmit={this.submissionHandler}>
                    <h1 className="bigTitle">Fill this out to work at Squared Labs </h1>
                    {form}
                    <button style={buttonStyle} disabled={!this.state.isFormValid} type="submit"> Submit Application </button>
                </form>

            </div>
        )

    }
}
export default EmployeeForm;