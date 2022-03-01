const students = [
    "Aaron Short",
    "Aletheia Kim",
    "Alexander (Xander) Gangemi",
    "Andrés (Andres) Soca",
    "Andrew Tran",
    "Anthony Adams",
    "Asia Le",
    "Brittany Moliver",
    "Cameron Abbott",
    "Cameron Whiteside",
    "Christy Chen",
    "Cody Lavene",
    "Daniel Lavergne",
    "David Nash",
    "Denise Li",
    "Dominique Samuels",
    "Eduardo (Eddie) Verdusco",
    "Eric Cortez",
    "Gabriel Aspuria",
    "Grant Russell",
    "Haozhen Shu",
    "Jacob (Jake) Weber",
    "Jedd Basden",
    "Jennifer Dijaili",
    "Jesse Brooks",
    "Jihoon (Jihoon (Fiona)) Choi",
    "John (Tanner) Shaw",
    "Jose (Andres) Aguilar-Garcia",
    "Karandeep Singh",
    "Kenneth (Ken) Dodson-Knapp",
    "Kielvin Bariso",
    "Kreston Caldwell-Mcmurrin",
    "Matthew (Matt) Satterwhite",
    "Maxim Grigg",
    "Megan Mckenna",
    "Meiyin (Mei) Shih",
    "Minu Kim",
    "Nathan (Nate) Treadaway",
    "Nathaniel Tseng",
    "Nik Tyler",
    "Peter Shin",
    "Robert Popphan",
    "Roger (Dylan) Silva",
    "Ryan Bender",
    "Savanah Trewman",
    "Seth Corbett",
    "Sophia Bui",
    "Sornam Vairavan",
    "Steve Correa",
    "Suhayl Khan",
    "Thien Dang",
    "Vivian Thach",
    "Vladimir Radovanovic",
    "William (Will) Duffy",
    "Yu Ra Kim",
    "Zhen Yu"
]

function groupify(students, groupSize) {
  const groups = {}
  const numGroups = Math.floor(students.length / groupSize);
  let studentsDup = students.slice();
  for (let i = 1; i <= numGroups; i++) {
    for (let j = 0; j < groupSize; j++) {
      const randIdx = Math.floor(Math.random() * students.length);
      const splitA = studentsDup.slice(0, randIdx);
      const splitB = studentsDup.slice(randIdx);
      const randStudent = splitA.pop();
      studentsDup = splitA.concat(splitB);
      if (randStudent) {
        if (groups[i] === undefined) {
          groups[i] = [randStudent];
        } else {
          groups[i].push(randStudent);
        }
      }
    }
  }
  return groups;
}

console.log(groupify(students, 3));