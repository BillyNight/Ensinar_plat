import { students } from '../database'

export function createStudent(form:any){
    students.push(form)
    return true;
}

export function deleteStudent(index:any){
    students.splice(index, 1)
    return true
}

export function updateStudent(form:any, index:number){
    students[index] = form;
    return true;
}

export function getStudentsLength(){
    return students?.length
}