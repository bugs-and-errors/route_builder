import React, { useState } from 'react';
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import Modal from "antd"

// const initialElements = [
//   {
//     id: '1',
//     type: 'input',
//     data: { label: 'Input Node' },
//     position: { x: 0, y: 0 },
//   },
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

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  console.log(elements)



  return (
    <div style={{ height: '100vh' }}>

      <button onClick={() => setopenModal(true)}>ADD BLOCK</button>

      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        deleteKeyCode={46} /* 'delete'-key */
      />
    </div>
  );
};

export default App;