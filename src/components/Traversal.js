import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./Traversal.css";

export function Traversal() {
  return (
    <Container className="content">
      <Row>
        <Col>
          <h6>How does the visualizer works?</h6>
          <p></p>

          <p>
            Quite simple actually, the visualizer works just like the pseudocode
            that was presented in the theory page. It is implemented in
            JavaScript, and the result of the traversal is the path from the
            start to the goal node. As can be deduced from the theory page, some
            of them are optimal, some are not, according to the algorithm used.
            <br /><br />
            The optimal path from the start to the goal node is denoted in{" "}
            <span className="shortest-font">this</span> color.
            <br />
            Besides optimal path, we also track the nodes that are visited but are not
            part of the path from the start to the goal node. They are denoted in{" "}
            <span className="visited-font">this</span> color.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
