import profileReducer, {addPostActionCreator, deletePostActionCreator} from "./profile-reducer";

//1. test data
let state = {
    postsData :[
        {id: 1, message: "Hello, what's your favourite EPL's club?", likesCount: 15},
        {id: 2, message: "I support Aston Willa", likesCount: 7}
    ]
}

test('new post should be added', () => {
    //1. test data
    let action = addPostActionCreator("Today is match day!")

    // 2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.postsData.length).toBe(3)
});

test('message of new post should be correct', () => {
    //1. test data
    let action = addPostActionCreator("Today is match day!")

    // 2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.postsData[2].message).toBe("Today is match day!")
});

test('after deleting length of postsData should be decremented', () => {
    //1. test data
    let action = deletePostActionCreator(1)

    // 2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.postsData.length).toBe(1)
});