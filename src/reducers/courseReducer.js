// reducer will handle list of courses
// ... is ES6 spread operator ... explodes array
export default function courseReducer(state = [], action) {
    switch (action.type) {
        case "CREATE_COURSE":
            console.log("In the create course of the course reducer");
            return [...state,
                Object.assign({}, action.course)
            ];

        default:
            return state;
    }
}