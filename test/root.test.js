import test from 'ava'
import React from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import render from 'react-test-renderer'
import Root from 'containers/Root'
import { Home } from 'components/Widgets'
import TestUtils from 'react-dom/test-utils'
import { shallow, mount } from 'enzyme'

async function renderIntoDocument(element) {
  const dom = document.createElement('div')
  // Fix instance is null bug in test-utils
  document.body.appendChild(dom)
  ReactDOM.render(element, dom)
  return dom
}

test('Root render', async t => {
  const tree = render.create(<Root />).toJSON()
  t.snapshot(tree)
})

test('click routing', async t => {
  // JSDom doesn't support navigate, so React-Router should using createMemoryHistory
  // shallow cannot find children's children elements, so we use mount here
  const wrapper = mount(<Root />)
  // Don't know why jsdom doesn't contain evt.button=0,
  // but this break react-router-dom's Link
  // https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/Link.js#L41
  wrapper.find('a.topics-link').simulate('click', {button: 0})
  t.is(wrapper.find('h2').text(), 'Topics')
})
