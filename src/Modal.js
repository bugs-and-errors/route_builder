import { useState } from 'react'


export default function Modals({ toggleModal, push }) {

  const [Id, setId] = useState("")
  const [NodeType, setNodeType] = useState("")

  const handleOk = () => {
    if (NodeType === "start") {
      push({
        id: Id,
        type: 'input',
        data: {
          label: <div>
            {Id}
            <button>x</button>
          </div>
        },
        position: { x: 0, y: 0 },
      })
    }
    handleCancel()
  }

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
          <option value="start">Start</option>
          <option value="node">Node</option>
          <option value="end">End</option>
        </select>

        <button className="btn" onClick={handleOk} style={{ right: "60pt" }}>OK</button>
        <button className="btn" onClick={handleCancel}>Close</button>
      </div>
    </div>
  )
}
