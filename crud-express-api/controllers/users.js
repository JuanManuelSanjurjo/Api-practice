import {v4 as uuidv4} from "uuid"

let users = [
    {
        name: "juan Manuel",
        surname: "sanjurjo", 
        age: 35,
        id: uuidv4()
    }
]


export const getUsers = (req, res) => {
    res.json(users)
}

export const createUser = (req,res) => {
    req.body.id = uuidv4()
    // let user = {...req.body,id}

    users.push(req.body)
    res.json(`User ${req.body.name} added to the database`)
}


export const getUser = (req,res) => {
    const user =  users.find( user => user.id === req.params.id)
 
    res.json(user)
}

export const deleteUser = (req, res) => {
    users =  users.filter( user => user.id !== req.params.id)

    res.json(`User with id ${req.params.id} has been eliminated from DB`)

}


export const patchUser = (req,res) => {
    const {name,surname,age} = req.body
    let user =  users.find( user => user.id === req.params.id)

    if(name) user.name = name
    if(surname) user.surname = surname
    if(age) user.age = age

    res.json(`User with id ${req.params.id} has been modified in DB`)

}