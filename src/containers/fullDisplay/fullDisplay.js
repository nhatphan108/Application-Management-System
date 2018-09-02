import React, { Component } from 'react';
import './fullDisplay.css';
import SingleInformation from '../../components/singleInformation/singleDisplay';
import axios from '../../axios';
import {Link} from 'react-router-dom';
class FullDisplay extends Component {
    state = {
        inputList: [],
        id: null
    }
    componentDidMount() {
       this.downloadData();
    }
    componentDidUpdate(){
        if( this.props.match.params.id != this.state.id){
            this.downloadData();
        }
    }
    /* {this.props.testObject.map(eachValue =>
        <SingleInformation key={eachValue.name}  {...eachValue} />
    )} */
    downloadData() {
        const newId = this.props.match.params.id;
        axios.get('inputs/' + newId + '.json')
            .then(response => this.setState({
                inputList: response.data,
                id: newId
            }))
            .catch(error => console.log(error))
    }
    render() {
        let information = "There are no people to show"
        if (this.state.inputList) {
            information = this.state.inputList.map(
                eachElement => <SingleInformation {...eachElement} />
            )
        }
        return (
            <div>
                <h1 className="titleStyling"> Application Full Information </h1>
                {information}
                <Link to='/display'> Go back to Application Display </Link> 
            </div>
        )
    }
}
export default FullDisplay;