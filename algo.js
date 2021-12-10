const nodes = "1 10 20 30 40 50 60 70 80".split(" ")

const paths = [
  ["1", "10"],
  ["10", "20"],
  ["10", "30"],
  ["10", "40"],
  ["30", "50"],
  ["20", "50"],
  ["40", "50"],
  ["50", "70"],
  ["60", "70"],
  ["70", "80"],
]

const adjacencyList = new Map()

const create_new_node = (node_name) => {
  adjacencyList.set(node_name, [])
}

const create_route = (source, destination) => {
  adjacencyList.get(source).push(destination)
  adjacencyList.get(destination).push(source)
}


nodes.forEach(create_new_node)
paths.forEach(path => create_route(...path))


console.log(adjacencyList)