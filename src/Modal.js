import React from 'react'


export default function Modals({ toggleModal }) {

  const handleOk = () => { }

  const handleCancel = () => {
    console.log("fucck")
    toggleModal()
  }

  return (
    <div className="modal_design_back">
      <div className="modal">
        <h3 className="modal-title">Add Node</h3>
        <input placeholder="Node ID/Name" className="modal_ip" />

        <select placeholder="Node Type" className="modal_ip">
          <option>Start</option>
          <option>Node</option>
          <option>End</option>
        </select>

        <button className="btn" onClick={handleCancel}>Close</button>
      </div>
    </div>
  )
}
