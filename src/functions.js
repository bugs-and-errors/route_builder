const get_possible_endpoints = (joints, nodes, connect_val) => {
  // console.log(joints, nodes, connect_val)

  const lst_of_pred = [connect_val]

  let src = connect_val?.prev
  let target = connect_val?.succ


  let get_pred_node = nodes?.filter(v => parseInt(v?.id) === parseInt(src))

  if (get_pred_node.length > 0 && get_pred_node[0]?.type !== "input") {

    get_pred_node = get_pred_node[0]?.id

    let get_super_pred = joints?.filter(v => parseInt(v?.succ) === parseInt(get_pred_node))

    lst_of_pred.push({ prev: get_super_pred[0]?.prev, succ: target })

  }

  console.log(lst_of_pred)
}


export { get_possible_endpoints }