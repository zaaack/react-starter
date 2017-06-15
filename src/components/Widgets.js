// @flow
import React from 'react'
import styled from 'styled-components'
import { Route, Link, MemoryRouter } from 'react-router-dom'
import type { RouterProps } from 'react-router'
import { connect } from 'react-redux'
import { debug } from 'utils'
import * as colors from 'consts/colors'
import Immuter from 'immuter'
import { clearFix } from 'polished'
import type { ImmuterGet, ImmuterSet, ImmuterUpdate, ImmuterDel } from 'immuter'

export const StyledHome = styled.div`
  border: 1px solid #f90;
  padding: 0 10px;
  color: ${colors.white};

  h2 {
    color: #9f0;
  }
`

function mapStateToProps(state) {
  return {
    home: state.home,
  }
}

type HomeState = {
  title: string,
  errors: {
    [string]: string | boolean,
  }
}
@connect(mapStateToProps)
@Immuter.bindComp()
class Home extends React.Component {
  state: HomeState = {
    title: '',
    errors: {
      some: false,
    },
  }
  props: RouterProps
  get: ImmuterGet
  set: ImmuterSet
  update: ImmuterUpdate
  delete: ImmuterDel
  unblock: Function

  componentDidMount() {
    const { props } = this
    debug('props', props)
    this.unblock = props.history.block((location, action) => {
      return '确定离开？'
    })
  }

  componentWillUnmount() {
    this.unblock()
    // for more API of immuter, you can see https://github.com/zaaack/immuter
    this.set('title', 'some')
    this.get('title')
    this.set('errors.some', 'Some errors happen!')
    this.set({
      'errors.some': 'Some errors happen!',
      'title': 'some',
    })
  }

  render() {
    const { props } = this
    window.props = props
    return (
      <StyledHome>
        <h2>Home</h2>
      </StyledHome>
    )
  }
}

export { Home }

export const About = () => (
  <div>
    <h2>About2</h2>
  </div>
)

export const Topic = ({ match }: RouterProps) => (
  <div>
    <h3>
      {match.params.topicId}</h3>
  </div>
)

export const Topics = ({ match }: RouterProps) => (
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
