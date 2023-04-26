import React, { useState, useContext } from 'react'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation
} from "../node_modules/react-router-dom";

import Layout from "./components/Layout";

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Student from './pages/students';
import StudentUpsert from './pages/students/upsert';
import { GlobalContext, GlobalContextType } from './contexts/global';
import "./styles/global.scss";

import DialogComponent from './components/Dialog';
import ToastComponent from './components/Toast';

function App() {
  const { loggedUser, setLoggedUser } = useContext<GlobalContextType>(GlobalContext)
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loggedUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        {!loggedUser ? 
          <Route path="/">
            <Route path="login" element={<Login />} />
          </Route >
        : null}
          <Route element={<Layout> <Outlet /> </Layout>}>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="student" element={<Student/>}/>
            <Route path="student/upsert" element={<StudentUpsert/>}/>
            <Route path="student/upsert/:studentId" element={<StudentUpsert/>}/>
          </Route>

      </Routes>
      <DialogComponent/>
      <ToastComponent/>
    </BrowserRouter>
  )
}

export default App
