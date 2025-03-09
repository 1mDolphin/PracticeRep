const jsonObj = [
    {
        "name": "Alice",
        "skills": ["Flutter", "React", "Django"]
      },
      {
        "name": "Alice",
        "skills": ["Flutter", "React", "Django"]
      },
      {
        "name": "Alice",
        "skills": ["Flutter", "React", "Django"]
      },
]
const skillslObj = jsonObj.flatMap(employee => employee.skills.map(skill => ({ skill })))
