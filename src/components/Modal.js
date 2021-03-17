// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import Close from '@material-ui/icons/Close';

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    handleConfirmDelete = () => {
        this.props.confirmDeleteCallback();
    }

    handleHideModal = () => {
        this.props.handleHideModal();
    }

    render() {
        return(
            // <!-- Modal content -->
            <div id="delete-list-modal" class="modal" hidden>
                <div class="modal-content">
                    <div class="container">
                        <div class="modal-top">
                        <div class="modal-header">Delete List?</div>      
                        <Close class="modal-close-button" onClick={this.handleHideModal}/>
                    </div>
                        <div class="modal-button-header">
                            <div class="modal-button" id="confirm-button" onClick= {this.handleConfirmDelete}>Confirm</div>
                            <div class="modal-button" id="cancel-button" onClick= {this.handleHideModal}>Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;