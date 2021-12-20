import React, { useState } from 'react';
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { CSVLink } from "react-csv";
import Modals from "./Modal"
import { get_possible_endpoints, unique_vals, get_pred_nodes } from "./functions"

const App = () => {
  const [elements, setElements] = useState([]);
  const [openModal, setopenModal] = useState(false)
  const [prev_succ, setprev_succ] = useState([])
  const [skipcal, setskipcal] = useState(false)

  const [skipState, setskipState] = useState([])

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) => {
    console.log(params)
    // prev and successor track
    const x = [...prev_succ]
    x.push({ prev: params?.source, succ: params?.target })
    setprev_succ(x)

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

  const skip_data = unique_vals(skipState)

  const CSV_Data = [["Predecessor", "Successor"], ...prev_succ?.map(v => { return [v?.prev, v?.succ] })]
  const skip_CSV_Data = [["Predecessor", "Successor"], ...skip_data?.map(v => { return [v?.prev, v?.succ] })]





  return (
    <div style={{ height: "100vh" }}>
      <br />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Modals toggleModal={toggleModal} push={push} Remove={Remove} setElements={setElements} setprev_succ={setprev_succ} />

        <div style={{ float: "right", marginRight: "10pt" }}>

          <button
            style={{ width: "fit-content", position: "relative", margin: "10pt", marginLeft: "0px" }}
            className="btn"
            onClick={() => {
              const nodes = []
              const skip_data = []
              elements?.forEach(v => {
                if (v?.id?.split("__")[0] !== "reactflow") {
                  nodes.push(v?.id)
                }
              })

              for (let node_id of nodes) {

                const nodes = prev_succ?.filter(v => v?.prev === node_id)
                const visited = [...nodes]
                const queue = [...nodes]

                while (queue.length > 0) {
                  const current_node = queue.shift()
                  const succesive_nodes = prev_succ?.filter(v => v?.prev === current_node?.succ)

                  queue.push(...succesive_nodes)
                  visited.push(...succesive_nodes)
                }
                skip_data.push(...visited?.map(v => { return { prev: node_id, succ: v?.succ } }))
              }
              setskipState(skip_data)
              setskipcal(true)
            }}

          >Calculate Skip</button>

          {prev_succ?.length > 0 && <CSVLink data={CSV_Data}>
            <button
              style={{ width: "fit-content", position: "relative", margin: "10pt", marginLeft: "0px" }}
              className="btn">Download No Skip</button>
          </CSVLink>}




          {prev_succ?.length > 0 && skipcal && <CSVLink data={skip_CSV_Data}>
            <button
              onClick={() => { setskipcal(false) }}
              style={{ width: "fit-content", position: "relative", margin: "10pt", marginLeft: "0px" }}
              className="btn">Download Skip</button>
          </CSVLink>}
        </div>

      </div>
      <div className="flow_chart_parent">
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          deleteKeyCode={46} /* 'delete'-key */
        />
      </div>

    </div>
  );
};

export default App;




//   () => {
          //   // console.log(prev_succ, elements)
          //   const start_nodes = []
          //   elements?.forEach(v => { if (v?.type === "input") { start_nodes.push(v?.id) } })

          //   const ele = {}

          //   for (let x of start_nodes) {
          //     const nodes = prev_succ?.filter(v => v?.prev === x)
          //     const visited = [...nodes]
          //     const queue = [...nodes]

          //     while (queue.length > 0) {
          //       const current_node = queue.shift()
          //       const succesive_nodes = prev_succ?.filter(v => v?.prev === current_node?.succ)
          //       // console.log(succesive_nodes)
          //       queue.push(...succesive_nodes)
          //       visited.push(...succesive_nodes)
          //     }

          //     const full_path = visited?.map(v => { return { prev: x, succ: v?.succ } })

          //     ele[x] = full_path
          //   }
          //   console.log(ele)
          // }}