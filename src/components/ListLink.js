// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");
        let statusType = "todo-list-not-selected";
        if (this.props.highlight === "true")
            statusType = "todo-list-selected";
        return (
            <div 
                className={`todo-list-button ${statusType} `}
                onClick={this.handleLoadList}
            >
                {this.props.toDoList.name}<br />
            </div>
        )
    }
}

export default ListLink;