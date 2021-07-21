import React, { useEffect } from 'react';
import styled from 'styled-components'
import theme from '../theme'

const CourseList = styled.ul`
  li {
    text-transform: Capitalize;
    line-height: 2
  }
`

const RecommendPadding = styled.div`
  padding: 0.75rem;
`

const RecommendWrapper = styled.div`
  border: 1px;
  border-radius: 5px;
  background: ${theme.color.light}
`

export default ({ courses }) => {
  console.log(courses)
  return courses ? (
    <RecommendWrapper>
      <RecommendPadding>
        <h2>Recommendations</h2>
        <section>
          <p>
            Based on your achievements, we think you might like these university courses &#127891;:
          </p>
          <CourseList>
            {courses.map(({ name, link }) => <li><a href={ link }>{ name }</a></li>)}
          </CourseList>
        </section>
      </RecommendPadding>
    </RecommendWrapper>
  ) : (
    <RecommendWrapper>Loading...</RecommendWrapper>
  )
}
