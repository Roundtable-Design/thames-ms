import React, { useState } from "react";
import styled from "styled-components";
import AchFilter from "./AchFilter";
import API from "../api";
import typeOptions from '../data/typeOptions'
import subjectOptions from '../data/subjectOptions'
import AchClickable from './AchClickable'

const StudentsWrapper = styled.div`
  max-width: 67.5rem;
`;

const StudentName = styled.h1`
  font-weight: bold;
`;

const AchWrapper = styled.div`
  border: 1px;
  border-radius: 3px;
`;

function isType(student, achievements, type) {
  let found = false;
  let i = 0;
  for(i < achievements.content.length; i++;) {
    if(achievements.content[i].fields.student_id == student.fields.id) {
      if (achievements.content[i].fields.type == type) {
        found = true;
      }
    }
  }
  return found
}

function isSubject(student, achievements, subject) {
  let found = false;
  let i = 0;
  console.log("1")
  console.log(i < achievements.content.length)
  for(i < achievements.content.length; i++;) {
    console.log("2")
    console.log(achievements.content[i].fields.student_id == student.fields.id)
    if(achievements.content[i].fields.student_id == student.fields.id) {
      console.log(achievements.content[i].fields.student_id == student.fields.id)
      let j = 0
      for ( j < achievements.content[i].fields.Associations.length; j++;)
      console.log(achievements.content[i].fields.Associations)
        if (achievements.content[i].fields.Associations[j] == subject) {
          found = true;
        }
    }
  }
  return found
}

export default ({ students }) => {
  const [typeFilter, setTypeFilter] = useState(null);
  const [subjectFilter, setSubjectFilter] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [ expanded, setExpanded ] = useState(false);
  const [ show, setShow ] = useState(true);
  let studentAchievements;


  React.useEffect(() => {
    if (!achievements) {
      (async () => {
        setAchievements(await API.get(`all`));
      })();
    }
  });
  return (
    achievements && (
      <StudentsWrapper>
        <AchFilter options={typeOptions} setFilter={setTypeFilter} />
        <AchFilter options={subjectOptions} setFilter={setSubjectFilter} />
        {students.content?.map((student, i) =>
          (!typeFilter || isType(student, achievements, typeFilter)) &&
            (!subjectFilter || isSubject(student, achievements, subjectFilter)) && (
            <AchClickable
            onClick={() => setExpanded(!expanded)}
            onBlur={() => setExpanded(false)}>
              <StudentName>
                {student.fields.Forename} {student.fields.Surname}
              </StudentName>
              {achievements.content?.map((achievement, j) =>
                (student.fields.id == achievement.fields.student_id) &&
                  (!typeFilter || achievement.fields.Type == typeFilter) &&
                  (!subjectFilter || achievement.fields.Associations == subjectFilter) &&
                  (expanded == true) && (
                    <AchWrapper href={`./achievements/${student.fields.id}`}>
                      <h2>{achievement.fields.Name}</h2>
                      <p>{achievement.fields.Date}</p>
                    </AchWrapper>
                  )
              )}
            </AchClickable>
          )
        )}
      </StudentsWrapper>
    )
  );
};
