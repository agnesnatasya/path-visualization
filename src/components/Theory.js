import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./Theory.css";

export function Theory() {
  return (
    <Container className="content">
      <Row>
        <Col>
          <h6>What is graph traversal?</h6>
          <strong>Graph traversal</strong> is the process of visiting vertices
          in a graph, through the edges. In this visualizer, we depict a single
          source and single goal node, thus the goal is to reach the goal node
          from the start node. There are other graph traversal which involves
          multiple starting or goal node, but it is not discussed here. <br />
          There are two types of graph traversal:
          <ul>
            <li>
              <b>Uninformed search</b>. In an uninformed search, the algorithm
              does not have any idea about how far the current node is to the
              goal node. Thus, it takes decision according to other known
              informations, such as the distance from the start node to a goal
              node.
            </li>
            <li>
              <b>Informed search</b>. In an informed search, the algorithm have
              information about how far the current node to the goal node is.
              Thus, it could make decision acccording to this information.
              Intuitively, you would want to explore nodes that are nearer to
              the goal node.
            </li>
          </ul>
          <h6>
            Are the grids in the visualizer a graph? <br />
          </h6>
          Yes, the grids represents a graph. Though graph is usually represented
          in a more disordered way, the grids in the visualizer is also a graph.
          Every grid in the graph is connected to either 2 or 3 or 4 adjacent
          grids. The graph is undirected.
          <br />
          <h6>Uninformed Search</h6>
          Algorithm which falls under uninformed search includes Breadth-First
          Search (BFS), Depth-First Search (DFS), Uniform-Cost Search (UCS),
          Dijkstra's Algorithm.
          <br />
          <br />
          <ul>
            <li>
              <strong>Breadth-First Search.</strong> The idea of BFS is from a
              single node, traverse all of its neighbors. After done, traverse
              the neighbors of neighbors. Thus, it is breadth-first, it traverse
              all nodes which are at a current layer before moving on to the
              next layer of nodes.
            </li>
            Here is a pseudocode of BFS algorithm
            <br></br>
            <code>
              def BFS(start):
              <br />
              &nbsp;&nbsp;queue = Queue(start)
              <br />
              &nbsp;&nbsp;visited = List(start)
              <br />
              &nbsp;&nbsp;while queue is not empty:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;current = queue.pop()
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;for all neighbor of current:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if neighbor === goal:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return neighbor
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if neighbor not in
              visited:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visited.add(neighbor)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;queue.add(neighbor)
            </code>
          </ul>
          <ul>
            <li>
              <strong>Depth-First Search.</strong> The idea of DFS is from a
              single node, explore its first neighbor. Then explore the first
              neighbor of this first neighbor and so on until it reaches a
              dead-end. After that, explore the second neighbor, and so on. The
              implementation is very similar to BFS with a slight modification
              of the data structure.
            </li>
            Here is a pseudocode of DFS algorithm
            <br></br>
            <code>
              def DFS(start):
              <br />
              &nbsp;&nbsp;stack = Stack(start)
              <br />
              &nbsp;&nbsp;visited = List(start)
              <br />
              &nbsp;&nbsp;while stack is not empty:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;current = queue.pop()
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;for all neighbor of current:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if neighbor === goal:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return neighbor
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if neighbor not in
              visited:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visited.add(neighbor)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;queue.add(neighbor)
            </code>
          </ul>
          <ul>
            <li>
              <strong>Dijkstra's Algorithm.</strong> Both BFS and DFS above does
              not keep track of path cost. Thus, the path that it chooses to
              reach the goal node might not be the cheapest, or the optimal.
              Dijkstra's Algorithm is an algorithm that keeps track of the cost
              of the traversal thus finding the optimal cost from start to goal
              node. It does this by maintaining a priority queue, the elements
              are sorted according to the current path cost from start to the
              current node.
            </li>
            Here is a pseudocode of Dijkstra's algorithm
            <br></br>
            <code>
              def Dijkstra(start):
              <br />
              &nbsp;&nbsp;pq = PriorityQueue((start, 0))
              <br />
              &nbsp;&nbsp;visited = List(start)
              <br />
              &nbsp;&nbsp;distance = Dictionary(start, 0)
              <br />
              &nbsp;&nbsp;for all node:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;enqueue((node, infinity))
              <br />
              &nbsp;&nbsp;while pq is not empty:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;current = pq.pop()
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;if current === goal:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return current
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;visited.add(current)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;for all neighbor of current:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if neighbor not in visited:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;distance_to_neighbor
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = min(
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              distance[neighbor],
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              distance[current] + cost(current, distance)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pq.update((neighbor,
              distance_to_neighbor))
            </code>
          </ul>
          <ul>
            <li>
              <strong>Uniform Cost Search.</strong> Uniform Cost Search is
              similar to Dijkstra's algorithm The difference is only that it
              does not have the initialisation phase or enqueuing all nodes to
              the priority queue. This way, it might need smaller space compared
              to Dijkstra's. It also maintains a priority queue like Dijkstra's
              algorithm and the elements are sorted according to the current
              path cost from start to the current node.
            </li>
            Here is a pseudocode of UCS algorithm
            <br></br>
            <code>
              def UCS(start):
              <br />
              &nbsp;&nbsp;pq = PriorityQueue((start, 0))
              <br />
              &nbsp;&nbsp;visited = List(start)
              <br />
              &nbsp;&nbsp;distance = Dictionary(start, 0)
              <br />
              &nbsp;&nbsp;while pq is not empty:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;current = pq.pop()
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;if current === goal:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return current
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;visited.add(current)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;for all neighbor of current:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if neighbor not in visited:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if neighbor in pq:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;distance_to_neighbor
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              = min(
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              distance[neighbor],
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              distance[current] + cost(current, distance)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              )
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pq.add(neighbor)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;distance_to_neighbor
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              = distance[current] + cost(current, distance)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <br />
            </code>
          </ul>
          <h6>Informed Search</h6>
          Algorithm which falls under uninformed search includes A* search and
          Greedy-best-first-search. Both are actually a variant of UCS. In
          informed searches, there is a notion of a heuristic function,
          <pre>h(n)</pre>, which indicates how far the node n to the goal node
          is.
          <br />
          <br />
          For simplicity, we use Manhattan distance from current node to goal
          node as our heuristic function.
          <ul>
            <li>
              <strong>A* Search.</strong> A* Search is similar to UCS algorithm
              The difference is only the function to prioritise the elements in
              the priority queue. In A* search, the function used to prioritise
              the elements is <pre>f(n) = distance(n) + h(n)</pre>.
            </li>
            Here is a pseudocode of A* algorithm
            <br></br>
            <code>
              def A*(start):
              <br />
              &nbsp;&nbsp;f = Dictionary(start, h(start))
              <br />
              &nbsp;&nbsp;pq = PriorityQueue((start, f[start]))
              <br />
              &nbsp;&nbsp;visited = List(start)
              <br />
              &nbsp;&nbsp;distance = Dictionary(start, 0)
              <br />
              &nbsp;&nbsp;while pq is not empty:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;current = pq.pop()
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;if current === goal:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return current
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;visited.add(current)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;for all neighbor of current:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if neighbor not in visited:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if neighbor in pq:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;distance_to_neighbor
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              = min(
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              distance[neighbor],
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              distance[current] + cost(current, distance)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              )
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f[neighbor]
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              = distance_to_neighbor + h(neighbor)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pq.add(neighbor)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;distance_to_neighbor
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              = distance[current] + cost(current, distance)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f[neighbor]
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              = distance_to_neighbor + h(neighbor)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <br />
            </code>
          </ul>
          <ul>
            <li>
              <strong>Greedy-Best-First Search.</strong> Greedy-Best-First
              Search is another variant of UCS algorithm. The difference is only
              the function to prioritise the elements in the priority queue. In
              Greedy-Best-First Search, the function used to prioritise the
              elements is simply <pre>h(n)</pre>.
            </li>
          </ul>
          <br />
        </Col>
      </Row>
    </Container>
  );
}
