import React, { useEffect } from 'react';
import styled from 'styled-components'

const CourseList = styled.ul`
  li {
    text-transform: Capitalize;
    line-height: 2
  }
`


export default ({ courses }) => {
  console.log(courses)
  return courses ? (
    <div>
      <h2>Recommendations</h2>
      <section>
        <p>
          Based on your achievements, we think you might like these university courses &#127891;:
        </p>
        <CourseList>
          {courses.map(({ name, link }) => <li><a href={ link }>{ name }</a></li>)}
        </CourseList>
      </section>
    </div>
  ) : (
    <div></div>
  )
}
