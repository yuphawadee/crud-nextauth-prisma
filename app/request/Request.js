export async function getStudent() {
    const studentRes = await fetch("http://localhost:3000/api/student", { cache: "no-store" });

    // ตรวจสอบสถานะก่อนการแปลงเป็น JSON
    if (!studentRes.ok) {
        console.error('API call failed:', studentRes.status);
        return []; // คืนค่า empty array หากไม่สามารถดึงข้อมูลได้
    }

    try {
        const students = await studentRes.json();
        return students;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return []; // คืนค่า empty array หากเกิดข้อผิดพลาด
    }
}

export async function getStudentCount() {
    const studentRes = await fetch("http://localhost:3000/api/student", { cache: "no-store" });
    if (!studentRes.ok) {
        console.error('API call failed:', studentRes.status);
        return 0;
    }

    try {
        const students = await studentRes.json();
        return students.length;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return 0; // คืนค่า empty array หากเกิดข้อผิดพลาด
    }
}

export async function getInternship() {
    const internshipRes = await fetch("http://localhost:3000/api/internship", { cache: "no-store" });

    // ตรวจสอบสถานะก่อนการแปลงเป็น JSON
    if (!internshipRes.ok) {
        console.error('API call failed:', internshipRes.status);
        return []; // คืนค่า empty array หากไม่สามารถดึงข้อมูลได้
    }

    try {
        const internships = await internshipRes.json();
        return internships;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return []; // คืนค่า empty array หากเกิดข้อผิดพลาด
    }
}

export async function getInternshipWithCount() {
    const internshipRes = await fetch("http://localhost:3000/api/internship", { cache: "no-store" });

    if (!internshipRes.ok) {
        console.error('API call failed:', internshipRes.status);
        return {
            internships: [],
            internshipCount: 0,
            cooperativeCount: 0,
            passedCount: 0,
            failedCount: 0
        }; // คืนค่า empty array และค่าต่าง ๆ หากไม่สามารถดึงข้อมูลได้
    }

    try {
        const internships = await internshipRes.json();

        // คำนวณจำนวนฝึกงาน, สหกิจ และนักศึกษาที่ผ่านการฝึกงาน/สหกิจ
        const internshipCount = internships.filter(i => i.type === 'ฝึกงาน').length;
        const cooperativeCount = internships.filter(i => i.type === 'สหกิจ').length;
        const passedCount = internships.filter(i => i.status === 'ผ่าน').length;
        const failedCount = internships.filter(i => i.status === 'ไม่ผ่าน').length;

        return {
            internships,
            internshipCount,
            cooperativeCount,
            passedCount,
            failedCount
        };
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return {
            internships: [],
            internshipCount: 0,
            cooperativeCount: 0,
            passedCount: 0,
            failedCount: 0
        }; // คืนค่า empty array และค่าต่าง ๆ หากเกิดข้อผิดพลาด
    }
}



export async function getOrganization() {
    const organizationRes = await fetch("http://localhost:3000/api/organization", { cache: "no-store" });

    // ตรวจสอบสถานะก่อนการแปลงเป็น JSON
    if (!organizationRes.ok) {
        console.error('API call failed:', organizationRes.status);
        return []; // คืนค่า empty array หากไม่สามารถดึงข้อมูลได้
    }

    try {
        const organizations = await organizationRes.json();
        return organizations;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return []; // คืนค่า empty array หากเกิดข้อผิดพลาด
    }
}

