import React, { Component } from 'react';
import SingleDisplay from '../../components/singleDisplay/singleDisplay';
import './display.css';
import FullDisplay from '../fullDisplay/fullDisplay';
import axios from '../../axios';
import { Route, Link } from 'react-router-dom';

class ApplicationsDisplay extends Component {
    state = {
        downloads: [],
        testObject: [
            {
                id: 'Name',
                value: 'Nhat Phan'
            },
            {
                id: 'Age',
                value: '28'
            },
            {
                id: 'Last Job',
                value: 'Server'
            },
            {
                id: 'Company',
                value: 'Google'
            }

        ]
    }
    componentDidMount() {
        console.log(this.props.match.path);
        axios.get('inputs.json')
            .then(response => {
                for (let key in response.data) {
                    const currentElement = response.data[key]
                    const newObject = {
                        name: currentElement[0].value,
                        age: currentElement[1].value,
                        occupation: currentElement[2].value,
                        key: key
                    }
                    const updatedList = [...this.state.downloads];
                    updatedList.push(newObject);
                    this.setState({
                        downloads: updatedList
                    })
                }
            })
            .catch(error => console.log(error))
    }

    EmployeeBrowser = () => {
        const firstRow = <SingleDisplay className="displayTitle " index='ID' name='Name' age='Age' occupation='Job' />
        const employees = this.state.downloads.map((employees, index) =>

            <Link key={employees.key} to={'/display/' + employees.key}>
                <SingleDisplay index={index} {...employees} />
            </Link>
        )
        return (
            <section>
                {firstRow}
                {employees}
            </section>)
    }
    render() {

        return (
            <React.Fragment>

                <Route path="/display/" exact component={this.EmployeeBrowser} />
                <Route path="/display/:id" exact component={FullDisplay} />

            </React.Fragment>
        )
    }
}
export default ApplicationsDisplay;