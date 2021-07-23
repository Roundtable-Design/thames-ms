import AchClickable from './AchClickable';
import React, { useState } from "react";
import styled from "styled-components";

export default (children) => {
  const [ expanded, setExpanded ] = useState(false)
  return (
    <AchClickable
    onClick={() => setExpanded(!expanded)}
    onBlur={() => setExpanded(false)}>
      (expanded) && (
        <>{children}</>
      )
    </AchClickable>
  )
}
