let get_pred_nodes = (sr, joints) => joints?.filter(v => {
  const succ = parseInt(v?.succ)
  const prev = parseInt(v?.prev)
  return succ === parseInt(sr)
})


const get_possible_endpoints = (joints, nodes, connect_val) => {
  // console.log(joints, nodes, connect_val)

  const lst_of_pred = [connect_val]

  let target = connect_val?.succ

  let src = connect_val?.prev



  let get_pred_node = get_pred_nodes(src, joints)
  console.log(get_pred_node, "prev node =", src)

  get_pred_node?.forEach(v => {
    const paths_from_start = []
    paths_from_start.push({ prev: v?.prev, succ: target })

  })

  // for (let i = 0; i < nodes.length; i++) {

  // let get_pred_node = nodes?.filter(v => parseInt(v?.id) === parseInt(src))

  // if (get_pred_node.length > 0 && get_pred_node[0]?.type !== "input") {

  //   get_pred_node = get_pred_node[0]?.id

  //   let get_super_pred = joints?.filter(v => parseInt(v?.succ) === parseInt(get_pred_node))

  //   lst_of_pred.push({ prev: get_super_pred[0]?.prev, succ: target })

  //   src = get_super_pred[0]?.prev

  // }
  // }
  // console.log(lst_of_pred)


  console.log(lst_of_pred, "bro")
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