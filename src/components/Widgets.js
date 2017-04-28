import React from 'react'
import styled from 'styled-components'
import { Route, Link, MemoryRouter } from 'react-router-dom'

export const StyledHome = styled.div`
  border: 1px solid #f90;
  padding: 0 10px;

  h2 {
    color: #9f0;
  }
`

export const Home = () => (
  <StyledHome>
    <h2>Home</h2>
  </StyledHome>
)

export const About = () => (
  <div>
    <h2>About2</h2>
  </div>
)

export const Topic = ({ match }) => (
  <div>
    <h3>
      {match.params.topicId}</h3>
  </div>
)

export const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
)
