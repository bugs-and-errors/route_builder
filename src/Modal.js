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
        <h1>hello</h1>



        <button className="btn" onClick={handleCancel}>Close</button>
      </div>
    </div>
  )
}
