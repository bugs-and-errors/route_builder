import { useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5"

import { AiOutlineSubnode, AiOutlineNodeIndex } from "react-icons/ai"
import { BsNodeMinusFill } from "react-icons/bs"

export default function Modals({ toggleModal, push, Remove, setprev_succ, setElements }) {

  const [Id, setId] = useState(0)
  const [NodeType, setNodeType] = useState("")

  const handleOk = () => {
    if (Id !== "" && NodeType !== "") {
      if (NodeType === "start") {
        push({
          id: Id,
          type: 'input',
          sourcePosition: 'right',
          targetPosition: 'left',
          data: {
            label: <div className="split-box">
              {Id}
              <button className="remove_btn"
                onClick={() => { Remove(Id) }}
              ><IoCloseCircleOutline /></button>
            </div>
          },
          position: { x: 0, y: 0 },
        })
      } else if (NodeType === "end") {
        push({
          id: Id,
          type: 'output',
          sourcePosition: 'right',
          targetPosition: 'left',
          data: {
            label: <div className="split-box">
              {Id}
              <button
                className="remove_btn"
                onClick={() => { Remove(Id) }}
              ><IoCloseCircleOutline /></button>
            </div>
          },
          position: { x: 0, y: 0 },
        })
      } else {
        push({
          id: Id,
          sourcePosition: 'right',
          targetPosition: 'left',
          data: {
            label: <div className="split-box">
              {Id}
              <button
                onClick={() => { Remove(Id) }}
                className="remove_btn"><IoCloseCircleOutline /></button>
            </div>
          },
          position: { x: 0, y: 0 },
        })
      }
      handleCancel()
    }
  }

  const handleCancel = () => {
    toggleModal()
    setId("")
    setNodeType("")
  }


  const Start = () => {
    if (Id !== "") {
      push({
        id: Id,
        type: 'input',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          label: <div className="split-box">
            {Id}
            <button className="remove_btn"
              onClick={() => { Remove(Id) }}
            ><IoCloseCircleOutline /></button>
          </div>
        },
        position: { x: 0, y: 0 },
      })
    }
    handleCancel()
  }

  const Node = () => {
    if (Id !== "") {
      push({
        id: Id,
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          label: <div className="split-box">
            {Id}
            <button
              onClick={() => { Remove(Id) }}
              className="remove_btn"><IoCloseCircleOutline /></button>
          </div>
        },
        position: { x: 0, y: 0 },
      })
    }
    handleCancel()
  }

  const End = () => {
    if (Id !== "") {
      push({
        id: Id,
        type: 'output',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          label: <div className="split-box">
            {Id}
            <button
              className="remove_btn"
              onClick={() => { Remove(Id) }}
            ><IoCloseCircleOutline /></button>
          </div>
        },
        position: { x: 0, y: 0 },
      })
    }
  }
  return (

    <div className="top">
      <div className="modal">




        <input placeholder="Node ID/Name" type="number" className="modal_ip" value={Id} onChange={e => setId(e.target.value)} />

        <button
          className="btn"
          onClick={Start}>
          <AiOutlineSubnode className="icon_z" />
          Start
        </button>

        <button
          className="btn"
          onClick={End}>
          <BsNodeMinusFill className="icon_z" />
          End
        </button>

        <button
          className="btn"
          onClick={Node}>
          <AiOutlineNodeIndex className="icon_z" />
          Node
        </button>





        {/* <button className="btn" onClick={handleCancel}>Close</button> */}
      </div>
    </div>
  )
}
