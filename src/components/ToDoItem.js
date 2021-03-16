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
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    handleListItemUp = () => {
        this.props.toDoListItemMoveCallback(this.props.toDoListItem, "moveItemUp");
    }

    handleListItemDown = () => {
        this.props.toDoListItemMoveCallback(this.props.toDoListItem, "moveItemDown");
    }

    handleListItemClose = () => {
        this.props.toDoListItemMoveCallback(this.props.toDoListItem, "moveItemClose");
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                <div className='task-col'>{listItem.description}</div>
                <div className='due-date-col'>{listItem.due_date}</div>
                <div className='status-col' className={statusType}>{listItem.status}</div>
                <div className='test-4-col'></div>
                <div className='list-controls-col'>
                    <KeyboardArrowUp className='list-item-control todo-button' onClick={this.handleListItemUp} />
                    <KeyboardArrowDown className='list-item-control todo-button' onClick={this.handleListItemDown}/>
                    <Close className='list-item-control todo-button' onClick={this.handleListItemClose}/>
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;