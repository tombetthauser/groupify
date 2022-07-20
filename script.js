const fs = require('fs');
const readline = require("readline");

const config = require('./config.json');
const badPairs = config.pairsToBlock

// ~~~~~~~~~~~~~~~ Back-Populate Bad Pairs ✅ ~~~~~~~~~~~~~~~
for (student1 in badPairs) {
  badPairs[student1].forEach(student2 => {
    if (student2 in badPairs) {
      badPairs[student2].push(student1)
    } else {
      badPairs[student2] = [student1]
    }
  })
}

let groupSize = null;
let students = [];

// ~~~~~~~~~~~~~~~ Import Students ✅ ~~~~~~~~~~~~~~~
if (students.length === 0) {
  fs.readFile('./students.txt', 'utf8', (err, data) => {
    if (err) return;
    students = data.split("\n").map(line => line.trim()).filter(line => line.length > 0);
  })
}

// ~~~~~~~~~~~~~~~ For Testing ~~~~~~~~~~~~~~~
const originalStudentCount = students.length;

// ~~~~~~~~~~~~~~~ Shuffle Students ✅ ~~~~~~~~~~~~~~~
function shuffleArray(array) {
  let curId = array.length;
  while (0 !== curId) {
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}

// ~~~~~~~~~~~~~~~ Main Function ~~~~~~~~~~~~~~~
function groupify(students, groupSize) {
  shuffleArray(students);
  
  const groups = {}
  const addedStudents = [];
  let groupNum = 1;

  while (students.length > groupSize) {
    const newGroup = [];
    for (let i = 0; i < groupSize; i++) {
      let student = students.pop();
      if (student in badPairs) {
        let isBadPairInGroup = newGroup.reduce((acc, ele) => (badPairs[student].includes(ele) || acc), false)
        // console.log({ isBadPairInGroup, student, newGroup, "badPairs[student]": badPairs[student]})
        while (isBadPairInGroup) {
          students.unshift(student);
          student = students.pop();
          isBadPairInGroup = false
          if (student in badPairs) {
            isBadPairInGroup = newGroup.reduce((ele, acc) => (badPairs[student].includes(ele) || acc), false)
          }
        }
      }
      newGroup.push(student);
      addedStudents.push(student);
    }
    groups[groupNum] = newGroup;
    groupNum += 1;
  }

  // if (
  //     (groupSize < 3 && students.length > 0) ||
  //     (students.length === groupSize - 1)
  //   ) {
  //   groups[groupNum] = [];
  //   for (let j = 0; j <= students.length; j++) {
  //     const student = students.pop();
  //     groups[groupNum].push(student);
  //     addedStudents.push(student);
  //   }
  // } else {
  for (let j = 1; j <= students.length; j++) {
    const student = students.pop();
    groups[j].push(student);
    addedStudents.push(student);
  }

  if (students.length > 0) {
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      let j = 0;
      let group = groups[j];
      if (student in badPairs) {
        let isBadPairInGroup = group.reduce((acc, ele) => (badPairs[student].includes(ele) || acc), false)
        // console.log({ isBadPairInGroup, student, newGroup, "badPairs[student]": badPairs[student]})
        while (isBadPairInGroup) {
          
          isBadPairInGroup = false
          if (student in badPairs) {
            isBadPairInGroup = newGroup.reduce((ele, acc) => (badPairs[student].includes(ele) || acc), false)
          }
        }
      }
    }
  }
  // }

  console.log({
    "Group Size": groupSize,
    "Original Student Count": originalStudentCount,
    "Added Students": addedStudents.length,
    "Unadded Student Count": students.length,
    "Unadded Students": students,
  })

  return Object.keys(groups).map(key => `${key}: ${groups[key].join(", ")}`).join('\n');
  // for (key in groups) {
  //   console.log(`${key}: ${groups[key].join(", ")}`)
  // }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter desired group size: ", function (groupSizeString) {
  groupSize = parseInt(groupSizeString);
  fs.writeFile('./output.txt', groupify(students, groupSize), err => {
    if (err) {
      console.error(err)
      return
    } else {
      console.log("Groups created and exported to output.txt! 🎉")
    }
  })
  rl.close();
});

