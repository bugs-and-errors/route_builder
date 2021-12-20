let get_pred_nodes = (sr, joints) => joints?.filter(v => {
  const succ = parseInt(v?.succ)
  // const prev = parseInt(v?.prev)
  return succ === parseInt(sr)
})


const get_possible_endpoints = (joints, nodes, connect_val) => {

  let lst_of_pred = [connect_val]

  const queue = [connect_val]

  while (queue.length > 0) {

    const curr_node = queue.shift()
    let get_pred_node = get_pred_nodes(curr_node?.prev, joints)
    queue.push(...get_pred_node)
    lst_of_pred.push(...get_pred_node)
  }
  lst_of_pred = lst_of_pred.map(v => { return { prev: v?.prev, succ: connect_val?.succ } })
  return lst_of_pred
}


const unique_vals = (skipState) => {
  const new_arr = []
  for (let i = 0; i < skipState.length; i++) {
    const prev = skipState[i]?.prev
    const succ = skipState[i]?.succ

    const includes = new_arr?.filter(v => v?.prev === prev && v?.succ === succ)
    if (includes.length > 0) {
      continue
    } else {
      new_arr.push(skipState[i])
    }

  }
  return new_arr
}


const skip_logic = (elements, prev_succ, setskipState, setskipcal) => {
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
}

export { get_possible_endpoints, unique_vals, get_pred_nodes, skip_logic }