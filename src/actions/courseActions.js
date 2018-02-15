// action creator creates actions
export function createCourse(course) {
    console.log("In the action creator");
    return { type: 'CREATE_COURSE', course };
}