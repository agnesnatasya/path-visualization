import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./Traversal.css";

export function Traversal() {
  return (
    <Container>
      <Row>
        <Col>
          <h6>
            What does the time complexity visualizer actually measure and how does it measures?
          </h6>
          <p>
            In the background, the visualizer actually inputs different values of <pre>n</pre> into the function that is submitted.
            The visualizer then calculates the lines excecuted by the algorithm from these different <pre>n</pre> sizes.<br />
            It then does a regression accross these values collected. In other words, it is trying to find the best function that represents <pre>f(n)</pre>.
            This serves to be an estimation of the tight bound of the algorithm, though it might not be 100% accurate.
          </p>

          <p>
            This is why, the visualizer only accepts one input, this input will be the size of n. For functions that have more than one input, no worries!
             Look at the sample code provided in the visualizer for example to do this!
          </p>

          <h6>
            Are we analysing the best, average of worst case of the algorithm?
          </h6>
          <p>
            This acutally depends on the input that is given by the user. As mentioned in the theory explanation, 
            most of the time, we are interested in the worst-case analysis. How do we achieve this?<br />

            Make sure that the input choice does not cause the algorithm to terminate early. For example, the sample function<br />
            <code>
              def f(x):
              <br />
              &nbsp;&nbsp;def binarySearch(arr, l, r, x): 
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;if r >= l: 
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mid = l + (r - l) // 2
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if arr[mid] == x: 
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return mid 
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elif arr[mid] > x: 
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return binarySearch(arr, mid + 1, r, x) 
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;else:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return -1
              <br />
              &nbsp;&nbsp;import random
              <br />
              &nbsp;&nbsp;for i in range(x):
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;arr = random.sample(range(0, x), x)
              <br />
              &nbsp;&nbsp;binarySearch(arr, 0, len(arr)-1, x+1)
            </code>
          </p>
          <p>
            The code is doing a binary search, it will terminate when it finds the number.<br />
            How do we make sure that we are analysing the worst-case? Find number that is not in the array.<br />
            In this case, the list contains number from 0 to <pre>x</pre> and the number searched is <pre>x + 1</pre>. <br />
            Thus, this is a worst-case analysis.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
