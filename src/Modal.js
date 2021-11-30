import { useState } from 'react'


export default function Modals({ toggleModal }) {

  const [Id, setId] = useState("")
  const [NodeType, setNodeType] = useState("")

  // const handleOk = () => { }

  const handleCancel = () => {
    toggleModal()
    setId("")
    setNodeType("")
  }

  return (
    <div className="modal_design_back">
      <div className="modal">
        <h3 className="modal-title">Add Node</h3>
        <input placeholder="Node ID/Name" className="modal_ip" value={Id} onChange={e => setId(e.target.value)} />

        <select placeholder="Node Type" className="modal_ip" value={NodeType} onChange={e => setNodeType(e.target.value)}>
          <option>Start</option>
          <option>Node</option>
          <option>End</option>
        </select>

        <button className="btn" onClick={handleCancel} style={{ right: "60pt" }}>OK</button>
        <button className="btn" onClick={handleCancel}>Close</button>
      </div>
    </div>
  )
}
