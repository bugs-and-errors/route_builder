import React, { useState } from 'react';
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import Modals from "./Modal"

// const initialElements = [
// {
//   id: '1',
//   type: 'input',
//   data: { label: 'Input Node' },
//   position: { x: 0, y: 0 },
// },
//   {
//     id: '2',
//     data: { label: 'Another Node' },
//     position: { x: 100, y: 125 },
//   },
//   {
//     id: '4',
//     type: 'output',
//     data: {
//       label: <div>
//         <h1>one</h1>
//         <button>xyz</button>
//       </div>
//     },
//     position: { x: 100, y: 150 },
//   }
// ];




const App = () => {
  const [elements, setElements] = useState([]);
  const [openModal, setopenModal] = useState(false)
  const [prev_succ, setprev_succ] = useState([])

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) => {

    // prev and successor track
    const x = [...prev_succ]
    x.push({ prev: params?.source, succ: params?.target })
    setprev_succ(x)

    // flow chart track
    setElements((els) => addEdge(params, els))
  };

  const toggleModal = () => {
    setopenModal(!openModal)
  }

  const push = (e) => {
    console.log(e)
    const ele = [...elements]
    ele.push(e)
    setElements(ele)
  }

  const Remove = (id) => {
    const ele = [...elements]
    setElements(ele?.filter(e => e?.id !== id))

    const x = [...prev_succ]
    setprev_succ(x.filter(v => v?.succ !== id || v?.prev !== id))
  }

  console.log(prev_succ)
  return (
    <div style={{ height: "100vh" }}>

      <button
        onClick={toggleModal}
        style={{ width: "fit-content", position: "relative", margin: "10pt" }}
        className="btn">ADD BLOCK</button>

      {openModal && <Modals toggleModal={toggleModal} push={push} Remove={Remove} />}

      {!openModal &&
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          deleteKeyCode={46} /* 'delete'-key */
        />}
    </div>
  );
};

export default App;