import React, { useState } from "react";
import styled from "styled-components";
import AchFilter from "./AchFilter";
import API from "../api";
import typeOptions from '../data/typeOptions';
import subjectOptions from '../data/subjectOptions';
import AchExpandable from './AchExpandable';

const StudentName = styled.h1`
  font-weight: bold;
`;

const AchWrapper = styled.div`
  border: 1px;
  border-radius: 3px;
`;

const StudentsWrapper = styled.div`
  max-width: 67.5rem;
`;

function isType(student, achievements, type) {
  let found = false;
  let i = 0;
  while (i < achievements.content.length) {
    if(achievements.content[i].fields.student_id == student.fields.id) {
      if (achievements.content[i].fields.type == type) {
        found = true;
      }
    }
    i++
  }
  return found
}

function isSubject(student, achievements, subject) {
  let found = false;
  let i = 0;
  while (i < achievements.content.length) {
    if(achievements.content[i].fields.student_id == student.fields.id) {
      let j = 0
      while ( j < achievements.content[i].fields.Associations.length) {
        if (achievements.content[i].fields.Associations[j] == subject) {
          found = true;
        }
        j++
      }
    }
  i++
  }
  return found
}

export default ({ students }) => {
  const [typeFilter, setTypeFilter] = useState(null);
  const [subjectFilter, setSubjectFilter] = useState(null);
  const [achievements, setAchievements] = useState(null);
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
            <>
              <StudentName>
                {student.fields.Forename} {student.fields.Surname}
              </StudentName>
              <AchExpandable>
                {achievements.content?.map((achievement, j) =>
                  (student.fields.id == achievement.fields.student_id) &&
                    (!typeFilter || achievement.fields.Type == typeFilter) &&
                    (!subjectFilter || achievement.fields.Associations == subjectFilter) && (
                      <AchWrapper href={`./achievements/${student.fields.id}`}>
                        <h2>{achievement.fields.Name}</h2>
                        <p>{achievement.fields.Date}</p>
                      </AchWrapper>
                    )
                )}
              </AchExpandable>
            </>
          )
        )}
      </StudentsWrapper>
    )
  );
};
