const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

function calcAverage(student) {
    return student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
}

function classify(avg) {
    if (avg >= 8.0) return "Giỏi";
    if (avg >= 6.5) return "Khá";
    if (avg >= 5.0) return "Trung bình";
    return "Yếu";
}

function formatAvg(avg) {
    return avg.toFixed(1);
}

const results = [];
for (let i = 0; i < students.length; i++) {
    const avg = calcAverage(students[i]);
    results.push({
        name: students[i].name,
        avg,
        grade: classify(avg),
        gender: students[i].gender,
        math: students[i].math,
        physics: students[i].physics,
        cs: students[i].cs,
    });
}

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
for (let i = 0; i < results.length; i++) {
    const r = results[i];
    const stt = String(i + 1).padEnd(3);
    const ten = r.name.padEnd(6);
    const tb = formatAvg(r.avg).padStart(4);
    const xl = r.grade.padEnd(11);
    console.log(`| ${stt} | ${ten} | ${tb} | ${xl} |`);
}

const countByGrade = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
for (let i = 0; i < results.length; i++) {
    countByGrade[results[i].grade]++;
}
console.log("\n--- Số SV mỗi xếp loại ---");
for (const grade in countByGrade) {
    console.log(`${grade}: ${countByGrade[grade]}`);
}

let highest = results[0];
let lowest = results[0];
for (let i = 1; i < results.length; i++) {
    if (results[i].avg > highest.avg) highest = results[i];
    if (results[i].avg < lowest.avg) lowest = results[i];
}
console.log(`\nĐiểm TB cao nhất: ${highest.name} (${formatAvg(highest.avg)})`);
console.log(`Điểm TB thấp nhất: ${lowest.name} (${formatAvg(lowest.avg)})`);

let sumMath = 0, sumPhysics = 0, sumCs = 0;
for (let i = 0; i < students.length; i++) {
    sumMath += students[i].math;
    sumPhysics += students[i].physics;
    sumCs += students[i].cs;
}
const n = students.length;
console.log("\n--- Điểm TB toàn lớp theo môn ---");
console.log(`Toán:      ${(sumMath / n).toFixed(2)}`);
console.log(`Vật lý:    ${(sumPhysics / n).toFixed(2)}`);
console.log(`Tin học:   ${(sumCs / n).toFixed(2)}`);

let sumMale = 0, countMale = 0, sumFemale = 0, countFemale = 0;
for (let i = 0; i < results.length; i++) {
    if (results[i].gender === "M") {
        sumMale += results[i].avg;
        countMale++;
    } else {
        sumFemale += results[i].avg;
        countFemale++;
    }
}
console.log("\n--- Bonus: Điểm TB theo giới tính ---");
console.log(`Nam (M):  ${countMale > 0 ? (sumMale / countMale).toFixed(2) : "N/A"}`);
console.log(`Nữ (F):   ${countFemale > 0 ? (sumFemale / countFemale).toFixed(2) : "N/A"}`);
