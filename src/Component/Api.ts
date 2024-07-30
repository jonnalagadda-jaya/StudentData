// import { Students } from "./types";

// export async function getStudents(): Promise<Students[]> {
//   try {
//    const response = await fetch(`https://studentmgmtapi.vercel.app/api/allStudents`);
//     const data = await response.json()
//     console.log("data", data)
//     return data.Students || [];
//   }
//     catch(error){
//         console.log("There was an error fetching the Data", error);
//     }
// }

// export async function deleteStudents(emailId: string) {
//   try {
//     const response = await fetch(`https://studentmgmtapi.vercel.app/api/deleteStudent`, {
//       method: "POST",
//       body: JSON.stringify({ emailId }),
//     })
//     const data = await response.json()
//     console.log(data)
//     }
//       catch(error){
//         console.log("There was an error fetching the Data", error);
//       }
// }

// export async function createStudents(student:Students) {
//   try {
//    const response = await fetch(`https://studentmgmtapi.vercel.app/api/createStudent`, {
//       method: "POST",
//       body: JSON.stringify(student),
//     })
//     const data = await response.json()
//     console.log("data", data)
//   }
//     catch(error){
//       console.log("There was an error fetching the Data", error);
      
//     }
// }


import { Students } from "./types";

const API = "https://studentmgmtapi.vercel.app/api/allStudents";

export async function getStudents(): Promise<Students[]> {
  try {
    const response = await fetch(API);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log("data", data);
    return data.students || []; // Ensure an array is returned
  } catch (error) {
    console.error("There was an error fetching the data", error);
    return []; // Return an empty array in case of an error
  }
}

export async function deleteStudents(emailId: string): Promise<void> {
  try {
    const response = await fetch(
      `https://studentmgmtapi.vercel.app/api/deleteStudent`,
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({ emailId }),
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    await response.json();
  } catch (error) {
    console.error("There was an error deleting the student", error);
    throw error; // Rethrow to trigger mutation error handling
  }
}

export async function createStudents(student: Students): Promise<void> {
  try {
    const response = await fetch(`https://studentmgmtapi.vercel.app/api/createStudent`,
      {
        method: "POST",
        body: JSON.stringify(student),
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    await response.json();
    console.log("Student created successfully");
  } catch (error) {
    console.error("There was an error creating the student", error);
    throw error; // Rethrow to trigger mutation error handling
  }
}

