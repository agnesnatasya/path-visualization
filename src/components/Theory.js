import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./Theory.css";

export function Theory() {
  return (
    <Container>
      <Row>
        <Col>
          <h6>
            The result given in the visualizer is the best prediction of the
            time complexity of the algorithm given. What is time complexity?
          </h6>
          The time complexity (rate-of-growth) is the growth of time consumed by the algorithm as
          the input size grows.
          <h6>
            What is input size? <br />
          </h6>
          Input size is, informally, the variable which affects the number of
          times the code is run. For example, look at this piece of code
          <br />
          <code>
            def f(x, n):
            <br />
            &nbsp;&nbsp;for i in range(n):
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;if i == x:
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(i)
          </code>
          <br />
          <p>
            The input size is the <var>n</var> variable and not the <var>x</var>{" "}
            variable. This is because, as the variable <var>n</var> varies, the
            number of times the code run differs.<br></br>
          </p>

          <h6>Time complexity (rate-of-growth of running time)</h6>
          <p>
            How do we measure the rate-of-growth of the running time of an algorithm?
            We can measure the running time of the algorithm, the literal
            time consumed by the algorithm, but this depends on the computer
            that is running it, thus it does not give a very best measure of an
            algorithm.
          </p>

          <p>Instead, we can estimate the rate-of-growth of the running time by analysing the algorithm
          using asymptotic analysis, the limiting behaviour of the algorithm as its input gets very large.
          </p>

          <h6>Analysis Types</h6>
          <p>
            There are three kinds of analyses:
            <ul>
              <li>
                Worst-case analysis, analysis according to the maximum time that
                can be consumed by the algorithm with input size n.
              </li>
              <li>
                Average-case analysis, analysis according to the average time
                that can be consumed by the algorithm with input size n.
              </li>
              <li>
                Best-case analysis, analysis according to the average time
                that can be consumed by the algorithm with input size n.
              </li>
            </ul>
          </p>

          <p>
            We usually are interested in finding worst-case analysis and average-case analysiss. 
            Worst-case analysis is useful because we are usually interested to know an upper-limit guarantee.
            Average-case analysis are useful in randomisation algorithms,
            but best-case analysis is not really useful in most cases.
          </p>

          <h6>Asymptotic Notations</h6>
          <p>
            There are different asymptotic notations:
             <ul>
              <li>
                &Omicron; (upper bound),
                <pre> f(n) = &Omicron;(g(n))</pre> if there exists positive constant <pre>c</pre> and <pre>n<sub>0</sub></pre>,
                such that <pre>0 &le; f(n) &le; c.g(n)</pre> for all <pre>n &ge; n<sub>0</sub></pre>.
              </li>
              <li>
                &Theta; (tight bound),
                <pre> f(n) = &Omega;(g(n))</pre> if there exists positive constant <pre>c1</pre>, <pre>c2</pre> and <pre>n<sub>0</sub></pre>,
                such that <pre>0 &le; c<sub>1</sub>.g(n) &le; f(n) &le; c<sub>2</sub>.g(n)</pre> for all <pre>n &ge; n<sub>0</sub></pre>.
              </li>
              <li>
                &Omega; (lower bound),
                <pre> f(n) = &Theta;(g(n))</pre> if there exists positive constant <pre>c</pre> and <pre>n<sub>0</sub></pre>,
                such that <pre>0 &le; c.g(n) &le; f(n)</pre> for all <pre>n &ge; n<sub>0</sub></pre>.
              </li>
            </ul>

            Woah! What are these definitions?? Most of the time, people are overwhelmed when reading these definitions. What do they really mean? <br />
            For example, you have a function <pre>f(n) = 2n<sup>2</sup></pre>. Let's try to find its upper, tight and lower bound.<br />
            <ul>
              <li>
                <strong>Upper bound.</strong> Let's try <pre>g(n) = n<sup>3</sup></pre>. Is this upper bound of <pre>f(n) = 2n<sup>2</sup></pre>?<br />
                In other words, does there exist positive constant <pre>c</pre> and <pre>n<sub>0</sub></pre>,  such that <pre>0 &le; c.g(n) &le; f(n)</pre> for all <pre>n &ge; n<sub>0</sub></pre>.<br />
                Let's try <pre>c = 2</pre> and <pre>n<sub>0</sub> = 2</pre>. It is obvious that <pre>0 &le; 2n<sup>2</sup> &le; 2n<sup>3</sup></pre> for all <pre>n &ge; 2</pre>. <br />
                As you can derive, other functions such as <pre>g(n) = n<sup>4</sup></pre>, <pre>g(n) = n<sup>5</sup></pre> can also be the upper bound of <pre>f(n)</pre>.<br />
                But is this not a <strong>tight</strong> upper bound. Is there any tighter bound for <pre>f(n)</pre>?<br />
                Let's try <pre>g(n) = n<sup>2</sup></pre>. Is this upper bound of <pre>f(n) = 2n<sup>2</sup></pre>?<br />
                Let's try <pre>c = 3</pre> and <pre>n<sub>0</sub> = 2</pre>. It is obvious that <pre>0 &le; 2n<sup>2</sup> &le; 3n<sup>2</sup></pre> for all <pre>n &ge; 2</pre>. <br />
                In fact, <pre>2n<sup>2</sup> = &Omicron;(n<sup>2</sup>)</pre>, <pre>n<sup>2</sup> is an upper bound of 2n<sup>2</sup></pre>! This is the tightest upper bound in-fact.
              </li>
              <li>
                <strong>Lower bound.</strong> You can apply the same analysis for the lower bound and you will find that the tightest lower bound of <pre>f(n)</pre> is <pre>g(n) = n<sup>2</sup></pre>.
                In other words, <pre>2n<sup>2</sup> = &Omega;(n<sup>2</sup>)</pre>.
              </li>
              <li>
                <strong>Tight bound.</strong> We have arrived to the tightest upper and lower bound of <pre>f(n)</pre>, as you can guess, this is indeed the tight bound of the algorithm.<br />
                This is one way to analyse at tight bound, find the tightest upper and lower bound, and they will converge to this tight bound.
              </li>
            </ul>
          </p>

          <h6>
            Does upper-bound means worst-case analysis and tight bound means average case analysis? 
          </h6>
          <p>
            NO! This is a common misconception!<br />
            For every type of analysis, especially worst-case and average-case we can calculate the different asymptotic behaviours, upper bound, tight bound and lower bound. 
          </p>

          <p>
            For example, in a worst-case analysis, <pre>f(n)</pre> = maximum number of steps run in an algorithm.
            We can then apply the definitions above to look for the different asymptotic behaviours.
          </p>


        </Col>
      </Row>
    </Container>
  );
}
