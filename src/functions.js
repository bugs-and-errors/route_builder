let get_pred_nodes = (sr, joints) => joints?.filter(v => {
  const succ = parseInt(v?.succ)
  const prev = parseInt(v?.prev)
  return succ === parseInt(sr)
})


const get_possible_endpoints = (joints, nodes, connect_val) => {

  const lst_of_pred = [connect_val]

  const queue = [connect_val]

  while (queue.length > 0) {

    const curr_node = queue.shift()
    let get_pred_node = get_pred_nodes(curr_node?.prev, joints)
    queue.push(...get_pred_node)
    lst_of_pred.push(...get_pred_node)
  }

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

export { get_possible_endpoints, unique_vals }