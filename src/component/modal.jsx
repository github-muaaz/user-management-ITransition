const Modal = ({onAccepted, targetId}) => {

    return(
        <div className="modal fade" id={targetId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h1 className="modal-title fs-5 text-danger" id="exampleModalLabel">Are you sure to Logout?</h1>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={onAccepted} className="btn btn-danger">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;