import React, { useState, useEffect } from "react";

const NoteModal = ({ isOpen, onClose, onSave, noteData }) => {
    const [editedNote, setEditedNote] = useState(noteData);

    useEffect(() => {
        // Update the editedNote state whenever noteData changes
        setEditedNote(noteData);
    }, [noteData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedNote((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(editedNote);
        onClose();
    };

    return ( <
        div className = { `modal ${isOpen ? "d-block" : ""}` } >
        <
        div className = "modal-dialog" >
        <
        div className = "modal-content" >
        <
        div className = "modal-header" >
        <
        h5 className = "modal-title" > Edit Note < /h5>{" "} <
        button type = "button"
        className = "btn-close"
        onClick = { onClose } > { " " } <
        /button>{" "} <
        /div>{" "} <
        div className = "modal-body" >
        <
        div className = "mb-3" >
        <
        label htmlFor = "title"
        className = "form-label" > { " " }
        Title { " " } <
        /label>{" "} <
        input type = "text"
        className = "form-control"
        id = "title"
        name = "title"
        value = { editedNote.title }
        onChange = { handleInputChange }
        minLength = { 5 }
        required /
        >
        <
        /div>{" "} <
        div className = "mb-3" >
        <
        label htmlFor = "description"
        className = "form-label" > { " " }
        Description { " " } <
        /label>{" "} <
        input type = "text"
        className = "form-control"
        id = "description"
        name = "description"
        value = { editedNote.description }
        onChange = { handleInputChange }
        minLength = { 5 }
        required /
        >
        <
        /div>{" "} <
        div className = "mb-3" >
        <
        label htmlFor = "tag"
        className = "form-label" > { " " }
        Tag { " " } <
        /label>{" "} <
        input type = "text"
        className = "form-control"
        id = "tag"
        name = "tag"
        value = { editedNote.tag }
        onChange = { handleInputChange }
        minLength = { 5 }
        required /
        >
        <
        /div>{" "} <
        /div>{" "} <
        div className = "modal-footer" > { " " } {
            /* <button
                                                                                      type="button"
                                                                                      className="btn btn-secondary"
                                                                                      onClick={onClose}
                                                                                    >
                                                                                      {" "}
                                                                                      Close{" "}
                                                                                    </button>{" "} */
        } { " " } <
        button type = "button"
        className = "btn btn-primary"
        onClick = { handleSave } >
        { " " }
        Save Changes { " " } <
        /button>{" "} <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        /div>
    );
};

export default NoteModal;