import AchClickable from './AchClickable';
import React, { useState } from "react";
import styled from "styled-components";

const StudentName = styled.h1`
  font-weight: bold;
`;

export default ({children, studentName}) => {
  const [ expanded, setExpanded ] = useState(false)
  return (
      <AchClickable
      onClick={() => setExpanded(!expanded)}
      onBlur={() => setExpanded(false)}>
      <StudentName>
        {studentName}
      </StudentName>
      { expanded && (
        <div>{children}</div>
      )}
      </AchClickable>
  )
}
