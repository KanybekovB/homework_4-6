import React, { useState } from "react";

export default function Post(props) {
  const [editStatus, setEditStatus] = useState(false);
  const [editName, setEditName] = useState(props.name);
  const [editDescription, setEditDescription] = useState(props.description);

  const hadnleEditClick = () => {
    setEditStatus(true);
  };

  const editSave = () => {
    props.editPost(props.id, {
      name: editName,
      description: editDescription,
    });
    setEditStatus(false);
  };

  return (
    <div className="post-card">
      <img src={props.img} alt={props.id} />
      {editStatus ? (
        <>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <button className="btn" onClick={editSave}>
            Save
          </button>
        </>
      ) : (
        <></>
      )}
      <h2 className="post-name">{props.name}</h2>
      <p className="post-description">{props.description}</p>
      <button
        className="btn btn-delete"
        onClick={() => props.deletePost(props.id)}
      >
        Delete
      </button>
      <button className="btn btn-edit" onClick={hadnleEditClick}>
        Edit
      </button>
    </div>
  );
}
