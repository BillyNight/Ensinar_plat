import { Student } from "../model/student";
import format from 'date-fns/format';
import ptBr from 'date-fns/locale/pt-BR';

export let students: Student[] = [
    {
        name: 'João Vitor R',
        entry: '111222',
        email: 'joao@app.com',
        phone: '24912341234',
        motherName: 'Angela',
        fatherName: "João",
        address: "Rua X n 70, Centro, Petrópolis, RJ",
        cpf: "12312312312",
        birthdate: new Date('06/13/2000'),
        
    },
    {
        name: 'Manoel Gomes',
        entry: '331222',
        email: 'manoel@gomes.com',
        phone: '24912344444',
        motherName: 'Janaina',
        fatherName: "Jaime",
        address: "Rua Y n 80 casa 3, Centro, Petrópolis, RJ",
        cpf: "32132132131",
        birthdate: new Date('09/28/1999'),
        
    },
]

export const professors = [{
    login: 'professor@app.com',
    pass: '12345678'
}]