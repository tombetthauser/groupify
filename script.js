const fs = require('fs');
const readline = require("readline");

let groupSize = null;
let students = [
    "Aaron Short",
    "Aletheia Kim",
    "Alexander Gangemi",
    "Andrew Tran",
    "Anthony Adams",
    "Asia Le",
    "Cameron Abbott",
    "Cameron Whiteside",
    "Christy Chen",
    "Cody Lavene",
    "Daniel Lavergne",
    "Denise Li",
    "Dominique Samuels",
    "Eddie Verdusco",
    "Eric Cortez",
    "Gabriel Aspuria",
    "Grant Russell",
    "Haozhen Shu",
    "Jake Weber",
    // "Jedd Basden",
    "Jennifer Dijaili",
    "Jesse Brooks",
    "Fiona Choi",
    "Tanner Shaw",
    "Andres Aguilar-Garcia",
    "Karandeep Singh",
    "Kenneth Dodson-Knapp",
    "Kielvin Bariso",
    "Kreston Caldwell-Mcmurrin",
    "Matthew (Matt) Satterwhite",
    "Maxim Grigg",
    "Megan Mckenna",
    "Mei Shih",
    "Minu Kim",
    "Nate Treadaway",
    "Nathaniel Tseng",
    // "Nik Tyler",
    "Peter Shin",
    "Robert Popphan",
    "Dylan Silva",
    "Ryan Bender",
    "Savanah Trewman",
    "Seth Corbett",
    // "Sophia Bui",
    "Sornam Vairavan",
    "Steve Correa",
    "Suhayl Khan",
    "Thien Dang",
    "Vivian Thach",
    "Vladimir Radovanovic",
    "Will Duffy",
    // "Yu Ra Kim",
    "Zhen Yu"
];

if (students.length === 0) {
  fs.readFile('./students.txt', 'utf8', (err, data) => {
    if (err) return;
    students = data.split("\n").map(line => line.trim()).filter(line => line.length > 0);
  })
}

const originalStudentCount = students.length;

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

function groupify(students, groupSize) {
  shuffleArray(students);
  
  const groups = {}
  const addedStudents = [];
  let groupNum = 1;

  while (students.length > groupSize) {
    const newGroup = [];
    for (let i = 0; i < groupSize; i++) {
      const student = students.pop();
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
  // }

  console.log({
    "Group Size": groupSize,
    "Original Student Count": originalStudentCount,
    "Added Students": addedStudents.length,
    "Unadded Students": students.length,
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

