import React, { Component } from 'react';
import EmployeeForm from './employeeForm/employeeForm';
import ApplicationsDisplay from './applicationsDisplay/applicationsDisplay';
import { Route } from 'react-router-dom';
class Layout extends Component {
    render() {
        return (
            <div>
                <Route path="/display"  component={ApplicationsDisplay} />
                <Route path="/" exact component={EmployeeForm} />
            </div>
        )
    }
}
export default Layout;
