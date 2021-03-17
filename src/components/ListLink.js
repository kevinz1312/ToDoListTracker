// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");

        this.state = {
            nameBeingEdited : false ,
        }
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    handleNameChange = (event) => {
        this.props.toDoListNameChangeCallback(this.props.toDoList, event.target.value);
        this.setState({nameBeingEdited : false})
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");
        let nameBeingEdited = this.state.nameBeingEdited;

        let statusType = "todo-list-not-selected";
        if (this.props.highlight === "true")
            statusType = "todo-list-selected";

        return (
            <div>
                {nameBeingEdited 
                ? <input className={`todo-list-button ${statusType} `} type="text" defaultValue={this.props.toDoList.name} onBlur={this.handleNameChange} autoFocus/>
                : <div className={`todo-list-button ${statusType} `} onClick={this.handleLoadList} onDoubleClick={() => {this.setState({nameBeingEdited: true})}}> {this.props.toDoList.name}<br/></div>
                }
            </div>
            )
        }
    }
export default ListLink;