import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import NoteModal from "./NoteModal";

const Dashboard = (props) => {
  const { logindata, setloginData } = useContext(LoginContext);
  const history = useNavigate();

  const [notesList, setNotesList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedNoteData, setEditedNoteData] = useState(null);

  const host = "http://localhost:8000";
  // const host = "https://notecloud-server-svk4.onrender.com";

  const openEditModal = (note) => {
    setEditedNoteData({ ...note });
    setIsModalOpen(true);
  };

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleEditNote = async (editedNote) => {
    try {
      const token = localStorage.getItem("usersdatatoken");

      const res = await fetch(`${host}/updatenote/${editedNote._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(editedNote),
      });

      if (res.ok) {
        // Update the note in the notesList
        props.showAlert("Note data Updated successfully ", "success");

        setNotesList((prevNotes) =>
          prevNotes.map((note) =>
            note._id === editedNote._id ? { ...note, ...editedNote } : note
          )
        );
      } else {
        props.showAlert("Failed to update the note", "danger");
      }
    } catch (error) {
      console.error(error);
    }

    // Close the modal
    setIsModalOpen(false);
  };

  const handleAddNote = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("usersdatatoken");

    const res = await fetch(`${host}/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(note),
    });

    if (res.ok) {
      props.showAlert("Note Added successfully ", "success");
      const newNote = { ...note };
      //   console.log("New note:", newNote);
      setNotesList((prevNotes) => [...prevNotes, newNote]);

      // Clear the form inputs after adding the note
      setNote({
        title: " ",
        description: " ",
        tag: " ",
      });
      await fetchNotes();
      //   console.log("Cleared input fields:", note);
    } else {
      props.showAlert("Note couldn't be added", "danger");
    }
  };

  const handleDeleteNote = async (noteId) => {
    const token = localStorage.getItem("usersdatatoken");

    const res = await fetch(`${host}/deletenote/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (res.ok) {
      setNotesList((prevNotes) =>
        prevNotes.filter((note) => note._id !== noteId)
      );
      await fetchNotes();

      props.showAlert("Note Deleted successfully ", "success");
    } else {
      props.showAlert("Failed to delete the Note data ", "danger");
    }
  };

  const fetchNotes = async () => {
    const token = localStorage.getItem("usersdatatoken");

    try {
      const response = await fetch(`${host}/fetchallnotes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.ok) {
        const notesData = await response.json();
        setNotesList(notesData);
      } else {
        console.error("Failed to fetch notes.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch(`${host}/validuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      history("/error");
    } else {
      //   console.log("user verify");
      setloginData(data);
      history("/dash");
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      let token = localStorage.getItem("usersdatatoken");

      try {
        const response = await fetch(`${host}/fetchallnotes`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.ok) {
          const notesData = await response.json();
          setNotesList(notesData);
        } else {
          console.error("Failed to fetch notes.");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {" "}
      {logindata && logindata.validUserOne ? (
        <>
          <h1
            className="Welcome_title"
            style={{
              fontSize: "2.0rem",
              marginTop: "33px",
              fontFamily: "'DM Serif Display', serif",
            }}
          >
            {" "}
            Welcome {logindata.validUserOne.fname.trim()} {" to "}
            NoteCloud.com{" "}
          </h1>{" "}
          <div className="container_form">
            <form onSubmit={handleAddNote}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title{" "}
                </label>{" "}
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={note.title}
                  ariadescribedby="emailHelp"
                  onChange={handleInputChange}
                  minLength={5}
                  required
                />
              </div>{" "}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description{" "}
                </label>{" "}
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={note.description}
                  onChange={handleInputChange}
                  minLength={5}
                  required
                />
              </div>{" "}
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag{" "}
                </label>{" "}
                <input
                  type="text"
                  className="form-control"
                  id="tag"
                  name="tag"
                  value={note.tag}
                  onChange={handleInputChange}
                  minLength={3}
                  required
                />
              </div>{" "}
              <button
                disabled={
                  note.title.length < 5 ||
                  note.description.length < 5 ||
                  note.tag.length < 3
                }
                type="submit"
                className="btn btn-secondary"
              >
                Add Note{" "}
              </button>{" "}
            </form>{" "}
          </div>{" "}
          <h2 className="mt-5" style={{ fontSize: "1.5rem" }}>
            {" "}
            Your Notes{" "}
          </h2>{" "}
          <div className="container">
            <div className="row">
              {" "}
              {notesList.length === 0 ? (
                <p> No notes yet.Create your first note! </p>
              ) : (
                notesList.map((note, index) => (
                  <div
                    className="col-md-4"
                    key={index}
                    style={{ width: "25%" }}
                  >
                    <div className="card my-3">
                      <div className="card-body">
                        <h5 className="card-title"> {note.title} </h5>{" "}
                        <p className="card-text"> {note.description} </p>{" "}
                        <i
                          className="fa-solid fa-trash mx-2"
                          onClick={() => handleDeleteNote(note._id)}
                          style={{ cursor: "pointer" }}
                        ></i>{" "}
                        <i
                          className="fa-solid fa-pen-to-square mx-2"
                          onClick={() => openEditModal(note)}
                          style={{ cursor: "pointer" }}
                        ></i>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>
                ))
              )}{" "}
            </div>{" "}
          </div>{" "}
          {editedNoteData && (
            <NoteModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleEditNote}
              noteData={editedNoteData}
            />
          )}{" "}
        </>
      ) : (
        <p> Loading... </p>
      )}{" "}
    </div>
  );
};

export default Dashboard;
