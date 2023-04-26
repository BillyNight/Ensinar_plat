
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Typography, Link } from '@mui/material';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import sha256 from 'crypto-js/sha256';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { GlobalContext } from '../../contexts/global';
import ToastComponent from '../../components/Toast';
import TeacherPng from '../../assets/4205.png'


function Login() {
  const navigate = useNavigate()
  
  //const { refreshData, setRefreshData }: any = React.useContext(GlobalContext)
  const { toast, setToast }: any = React.useContext(GlobalContext)

  const { loggedUser, setLoggedUser, getLogin }: any = React.useContext(GlobalContext)
  const [loginLoading, setLoginLoading] = React.useState<any>(false)

  const validationSchema: any = yup.object().shape({
    email: yup.string().email("Por favor, informe um e-mail válido").required("O email é obrigatório"),
    password: yup.string().min(8, "A senha deve ter no mínimo 8 caracteres").required("A senha é obrigatória")
  });

  const handleLogin: any = async (credentials: any) => {
    try {
      setLoginLoading(true)
      const res = getLogin(credentials?.email, credentials?.password)
      if(res){
        navigate(`/dashboard`)
        setToast({ ...toast, open: true, message: 'Logado com sucesso!' })
        setLoginLoading(false)
      } else {
        setToast({ ...toast, open: true, message: "Email ou senha incorretos" })
        setLoginLoading(false)
        return
      }

    } catch (error: any) {

    }
  }

  const formik: any = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      handleLogin(values)
    },
  });

  return (
    <Container sx={{ height: '100%', display: 'grid', placeItems: 'center' }} component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant='h2'>Ensinar</Typography>
        
          <img style={{ width: '100%', maxWidth: '90px' }} src={TeacherPng} alt="teacher" />

        <Typography component="h1" variant="subtitle1">
          Conectar-se
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoComplete="email"
            margin="normal"
            fullWidth
            autoFocus
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Senha"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete="current-password"
            margin="normal"
            fullWidth
          />

          <LoadingButton
            loading={loginLoading}
            disabled={loginLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </LoadingButton>
        </form>
      </Box>
      <ToastComponent />

    </Container >
  )
}
export default Login