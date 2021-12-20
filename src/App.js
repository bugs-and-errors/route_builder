import React, { useState } from 'react';
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { CSVLink } from "react-csv";
import Modals from "./Modal"
import { unique_vals, skip_logic } from "./functions"

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
            onClick={() => skip_logic(elements, prev_succ, setskipState, setskipcal)}

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



