import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
export function formatDate(date: Date){
return String(format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBr }))
}

export function newDateFromStringPtBr(date: string){
  return new Date(date.split('/').reverse().join('/'))
}