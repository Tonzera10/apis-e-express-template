import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { TCourse, TStudent } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// primeira prática diaria

app.get("/courses", (req: Request, res: Response)=>{
    res.status(200).send(courses)
})

// segundaprática diária

app.get('/courses/search', (req: Request, res: Response)=>{
    // const {q} = req.query

    const q = req.query.q as string

    const result = courses.filter((course)=>{
        return course.name.toLowerCase().includes(q.toLowerCase())
    })

    res.status(200).send(result)
})

// terceira prática diária

app.post('/courses', (req: Request, res: Response)=>{
    // const {id} = req.body
    // const {name} = req.body
    // const {lessons} = req.body
    // const {stack} = req.body

    const {id, name, lessons, stack} = req.body

    const newCourse: TCourse = {
        id,
        name,
        lessons,
        stack
    }

    courses.push(newCourse)

    res.status(201).send('Curso registrado com sucesso!')
})


//prática para gravar

app.get('/students', (req: Request, res: Response)=> {
    res.status(200).send(students)
})

app.get('/students/search', (req: Request, res: Response)=>{
    const q = req.query.q as string

    const result = students.filter((student) => {
        return student.name.toLowerCase().includes(q.toLowerCase())
    })

    res.status(200).send(result)
})

app.post('/students', (req: Request, res: Response)=>{
    const {id, name, age} = req.body 

    const newStudent: TStudent = {
        id,
        name,
        age
    }

    students.push(newStudent)

    res.status(201).send('Estudante resgistrado com sucesso!')
})