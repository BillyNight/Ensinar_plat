
import { createContext, useState } from 'react'
import { students, professors } from '../../api/database'
import { Student } from "../../api/model/student"

type DialogType = {
  open: boolean
  type?: string
  title: string
  message: string
  isSubmitting?: boolean
  handleConfirm?: () => void
  handleCancel?: () => void
}

type ToastType = {
  open: boolean
  message: string
  autoHideDuration?: number
  action?: string
}

export type GlobalContextType = {
  toast: ToastType
  dialog: DialogType
  isSidebarExpanded: boolean
  loggedUser: boolean
  students: Student[]
  setToast: React.Dispatch<React.SetStateAction<ToastType>>
  setDialog: React.Dispatch<React.SetStateAction<DialogType>>
  setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>
  setLoggedUser: React.Dispatch<React.SetStateAction<boolean>>
  getStudent: (stuIndex:any) => Student
  getLogin: (email:any, pass:any) => boolean
  dismissDialog: (...args: any) => any
}

export const GlobalContext: any = createContext<GlobalContextType | null>(null)

export function GlobalProvider(props: any) {

  const [isSidebarExpanded, setIsSidebarExpanded] = useState<Boolean>(true)

  const [loggedUser, setLoggedUser] = useState<Boolean>(false)

  const [toast, setToast] = useState<ToastType>({
    open: false,
    message: '',
    autoHideDuration: 2000,
    action: '',
  })

  const [dialog, setDialog] = useState<DialogType>({
    open: false,
    type: '',
    title: '',
    message: '',
    isSubmitting: false,
    handleConfirm: () => null,
    handleCancel: () => null,
  })

  const getLogin = (email:any, pass: any) => {
    if(email != professors[0].login || pass != professors[0].pass) {
      return false
    }
    setLoggedUser(true);
    return true
  }

  const getStudent = (stuIndex:any) => {
    return students[stuIndex]
  }

  const dismissDialog = () => {
    setDialog({
      ...dialog,
      open: false,
      handleConfirm: () => null, handleCancel: () => null,
    })
  }

  return (
    <GlobalContext.Provider value={{
      toast,
      dialog,
      loggedUser,
      setToast,
      setDialog,
      dismissDialog,
      setLoggedUser,
      students,
      isSidebarExpanded,
      setIsSidebarExpanded,
      getStudent,
      getLogin,
    }}>
      {props.children}
    </GlobalContext.Provider>
  )
}
