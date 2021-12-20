import React, { useState } from 'react';
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { CSVLink } from "react-csv";
import Modals from "./Modal"
import { get_possible_endpoints, unique_vals } from "./functions"

const App = () => {
  const [elements, setElements] = useState([]);
  const [openModal, setopenModal] = useState(false)
  const [prev_succ, setprev_succ] = useState([])

  // const [skipState, setskipState] = useState([])

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));


  // console.log(prev_succ)
  const onConnect = (params) => {
    console.log(params)
    // prev and successor track
    const x = [...prev_succ]
    x.push({ prev: params?.source, succ: params?.target })
    setprev_succ(x)

    // flow tracker
    // const possible_endpoints = get_possible_endpoints(prev_succ, elements, { prev: params?.source, succ: params?.target })
    // let skip = [...skipState, ...possible_endpoints]
    // setskipState(skip)

    // flow chart track
    params = { ...params }
    params["animated"] = true
    params["arrowHeadType"] = "arrow"
    setElements((els) => addEdge(params, els))
  };

  const toggleModal = () => {
    setopenModal(!openModal)
  }

  const push = (e) => {
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

  // const skip_data = unique_vals(skipState)

  const CSV_Data = [["Predecessor", "Successor"], ...prev_succ?.map(v => { return [v?.prev, v?.succ] })]
  // const skip_CSV_Data = [["Predecessor", "Successor"], ...skip_data?.map(v => { return [v?.prev, v?.succ] })]





  return (
    <div style={{ height: "100vh" }}>
      <br />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Modals toggleModal={toggleModal} push={push} Remove={Remove} setElements={setElements} setprev_succ={setprev_succ} />

        <div style={{ float: "right", marginRight: "10pt" }}>
          {prev_succ?.length > 0 && <CSVLink data={CSV_Data}>
            <button
              style={{ width: "fit-content", position: "relative", margin: "10pt", marginLeft: "0px" }}
              className="btn">Download Excel For No Skip</button>
          </CSVLink>}

          <button onClick={() => {
            // console.log(prev_succ, elements)
            const start_nodes = []
            elements?.forEach(v => { if (v?.type === "input") { start_nodes.push(v?.id) } })

            const ele = {}

            for (let x of start_nodes) {
              const nodes = prev_succ?.filter(v => v?.prev === x)
              const visited = [...nodes]
              const queue = [...nodes]

              while (queue.length > 0) {
                const current_node = queue.shift()
                const succesive_nodes = prev_succ?.filter(v => v?.prev === current_node?.succ)
                // console.log(succesive_nodes)
                queue.push(...succesive_nodes)
                visited.push(...succesive_nodes)
              }
              ele[x] = visited
            }
            console.log(ele)
          }}>Calculate Skip</button>


          {/* {prev_succ?.length > 0 && <CSVLink data={skip_CSV_Data}>
            <button
              style={{ width: "fit-content", position: "relative", margin: "10pt", marginLeft: "0px" }}
              className="btn">Download Excel For Skip</button>
          </CSVLink>} */}
        </div>

      </div>

      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        deleteKeyCode={46} /* 'delete'-key */
      />
      {/* } */}
    </div>
  );
};

export default App;