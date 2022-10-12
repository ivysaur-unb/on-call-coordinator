import { createTeacherUser } from '../persist/teacher'
const teachers = [
    {
        initials: "CF",
        user: {
            name: "Cameron Fiander",
            email: "camfiander@gmail.com",
            role: "TEACHER"
        }
    },
    {
        initials: "GT",
        user: {
            name: "Gian Tamayo",
            email: "gian@gmail.com",
            role: "TEACHER"
        }
    }
]

export default async function initializeDatabase() {
    for (const teach of teachers) {
        await createTeacherUser(teach);
    }
}