// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");

        this.state = {
            taskBeingEdited : false ,
            dateBeingEdited : false ,
            stausBeingEdited : false
        }
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    handleListItemUp = () => {
        if(!document.getElementById("todo-list-arrow-up-" + this.props.toDoListItem.id).classList.contains("disabled-button"))
            this.props.toDoListItemMoveCallback(this.props.toDoListItem, "moveItemUp");
    }

    handleListItemDown = () => {
        if(!document.getElementById("todo-list-arrow-down-" + this.props.toDoListItem.id).classList.contains("disabled-button"))
            this.props.toDoListItemMoveCallback(this.props.toDoListItem, "moveItemDown");
    }

    handleListItemClose = () => {
        this.props.toDoListItemMoveCallback(this.props.toDoListItem, "moveItemClose");
    }

    handleDescriptionChange = (event) => {
        if(event.target.value != this.props.toDoListItem.description)
            this.props.toDoListItemChangeCallback(this.props.toDoListItem, "description", event.target.value);
        this.setState({taskBeingEdited : false})
    }

    handleDateChange = (event) => {
        if(event.target.value != this.props.toDoListItem.due_date)
            this.props.toDoListItemChangeCallback(this.props.toDoListItem, "date", event.target.value);
        this.setState({dateBeingEdited : false})
    }

    handleStatusChange = (event) => {
        if(event.target.value != this.props.toDoListItem.status)
            this.props.toDoListItemChangeCallback(this.props.toDoListItem, "status", event.target.value);
        this.setState({stausBeingEdited : false})
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        let taskBeingEdited = this.state.taskBeingEdited;
        let dateBeingEdited = this.state.dateBeingEdited;
        let stausBeingEdited = this.state.stausBeingEdited;

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                {taskBeingEdited 
                ? <input className='task-col' type="text" defaultValue={listItem.description} onBlur={this.handleDescriptionChange} autoFocus/>
                : <div className='task-col' onClick= { () => {this.setState({taskBeingEdited: true})}}>{listItem.description}</div>
                }

                {dateBeingEdited
                ? <input type='date' class='due-date-col' defaultValue ={listItem.due_date} onBlur={this.handleDateChange} autoFocus/>
                : <div className='due-date-col' onClick= { () => {this.setState({dateBeingEdited: true})}}>{listItem.due_date}</div>
                }

                {stausBeingEdited
                ? <select class='status-col' onBlur={this.handleStatusChange} defaultValue = {listItem.status} autoFocus><option value='complete'>Complete</option> <option value='incomplete'>Incomplete</option></select>
                : <div className={`status-col ${statusType}`} onClick= { () => {this.setState({stausBeingEdited: true})}}>{listItem.status}</div>
                } 

                <div className='test-4-col'></div>
                
                <div className='list-controls-col'>
                    <KeyboardArrowUp className='list-item-control todo-button' id={"todo-list-arrow-up-" + listItem.id}  onClick={this.handleListItemUp} />
                    <KeyboardArrowDown className='list-item-control todo-button' id={"todo-list-arrow-down-" + listItem.id} onClick={this.handleListItemDown}/>
                    <Close className='list-item-control todo-button' onClick={this.handleListItemClose}/>
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;