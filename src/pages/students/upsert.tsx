import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../components/Loading'
import Subtitle from '../../components/Subtitle';
import { isValid } from 'date-fns'
import format from 'date-fns/format';
import ptBr from 'date-fns/locale/pt-BR';
import { GlobalContext, GlobalContextType } from '../../contexts/global';
import * as yup from 'yup'
import { createStudent, deleteStudent, updateStudent } from '../../api/controllers';
import FooterLayout from '../../components/Layout/Footer';
import HeaderLayout from '../../components/Layout/Header';
import { formatPhone } from '../../utils/formatCellPhone';
import { isFuture } from 'date-fns';

export default function UpsertStudent(props: any) {

  const navigate = useNavigate();

  const { studentId = undefined }: any = useParams();
  const { getStudent ,toast, setToast, setDialog } = React.useContext(GlobalContext) as GlobalContextType

  const [student, setStudent] = React.useState<any>(null)
  const [loading, setLoading] = React.useState<any>(false)
  const [refreshAutocomplete, setRefreshAutocomplete] = React.useState<any>(false)

  useEffect(() => {
    const getStudentById: any = async () => {
      try {
        if (studentId) {
          setStudent(getStudent(studentId))
        }
      } catch (error: any) {
        console.log("Erro: ", error.response)
      }
    }
    getStudentById()
  }, [navigate])

  const validationSchema: any = yup.object().shape({
    name: yup.string().required("Esse campo é obrigatório"),
    entry: yup.string().required("Esse campo é obrigatório"),
    cpf: yup.string().required("Esse campo é obrigatório").matches(/([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/, "Informe um CPF válido"),
    email: yup.string().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Informe um e-mail válido"),
    birthdate: yup.string().required("Esse campo é obrigatório").matches(/^\d{2}\/\d{2}\/\d{4}$/, "Informe uma data válida"),
    motherName: yup.string().required("Esse campo é obrigatório"),
    fatherName: yup.string().required("Esse campo é obrigatório"),
    address: yup.string().required("Esse campo é obrigatório"),
  })

  const handleCreateStudent = async (formData: any) => {
    try {
      setLoading(true)
      const createData = {
        ...formData,
        birthdate: new Date(formData?.birthdate?.split('/')?.reverse()?.join('/')),
      }
      if(!isValid(createData.birthdate) || isFuture(createData.birthdate)) { 
        setToast({
          ...toast,
          open: true,
          message: 'Insira uma data de nascimento válida'
        })
        return
      }
      const res = createStudent(createData)
      setToast({ ...toast, open: true, message: 'Estudante criado com sucesso!' })
      navigate("/student")
    } catch (error: any) {
      setToast({
        ...toast,
        open: true,
        message: error?.response
      })
    }
    finally {
      setLoading(false)
    }
  }
  const handleUpsertStudent = async (formData: any) => {
    try {
      setLoading(true)
      
      const createData = {
        ...formData,
        birthdate: new Date(formData?.birthdate?.split('/')?.reverse()?.join('/')),
      }
      console.log(isFuture(createData.birthdate))
      if(!isValid(createData.birthdate) || isFuture(createData.birthdate)) { 
        setToast({
          ...toast,
          open: true,
          message: 'Insira uma data de nascimento válida'
        })
        return
      }
      updateStudent(createData, studentId);
      setToast({ ...toast, open: true, message: 'Estudante atualizado com sucesso!' })
      navigate("/student")
    } catch (error: any) {
      setToast({
        ...toast,
        open: true,
        message: error
      })
    }
    finally {
      setLoading(false)
    }
  }

  const handleDeleteStudent = async () => {
    try {
      deleteStudent(studentId)
      setToast({ ...toast, open: true, message: 'Estudante deletado com sucesso!' })
      navigate(`/student`)
    } catch (error: any) {
      setToast({
        ...toast,
        open: true,
        message: error?.response?.data?.message
      })
    }
  }

  const formik: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: student?.name || "",
      entry: student?.entry || "",
      email: student?.email || "",
      birthdate: student?.birthdate ? format(new Date(student?.birthdate), "dd/MM/yyyy", { locale: ptBr }) : "",
      motherName: student?.motherName || "",
      fatherName: student?.fatherName || "",
      cpf: student?.cpf || "",
      phone: student?.phone || "",
      address: student?.address || "",
    },
    validationSchema: validationSchema,
    onSubmit: (formData: any) => {
      if (studentId) { handleUpsertStudent(formData) }
      else { handleCreateStudent(formData) }
    },
  });

  if (loading) return <LoadingComponent />

  else return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <HeaderLayout title={studentId ? 'Estudante' : 'Novo Estudante'} />

      <Box sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
        <form id='submit-student' onSubmit={formik.handleSubmit}>
          <Box sx={{
            border: '1px dashed #C4C4C4',
            borderRadius: '4px',
            p: 3
          }}>
            <Subtitle mb={1} label="Detalhes do estudante" />

            <TextField
              id="name"
              label="Nome completo"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name ? true : false}
              helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
              margin="normal"
              fullWidth
            />

            <TextField
              id="email"
              label="Email"
              name="email"
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email ? true : false}
              helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
              margin="normal"
              fullWidth
            />

            <TextField
              id="phone"
              label="Telefone"
              name="phone"
              // InputProps={{ readOnly: loggedUser?.type !== 'clinic' ? true : false }}
              value={formik.values.phone}
              onChange={(e) => {
                const formattedPhone = formatPhone(e.target.value)
                formik.setFieldValue('phone', formattedPhone)
              }}
              error={formik.touched.phone && formik.errors.phone ? true : false}
              helperText={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
              margin="normal"
              fullWidth
            />

            <TextField
              id="entry"
              label="Matrícula"
              name="entry"
              value={formik.values.entry}
              onChange={formik.handleChange}
              error={formik.touched.entry && formik.errors.entry ? true : false}
              helperText={formik.touched.entry && formik.errors.entry ? formik.errors.entry : ''}
              margin="normal"
              fullWidth
            />
            
            <InputMask
              mask="999.999.999-99"
              value={formik?.values?.cpf}
              onChange={formik.handleChange}
            >
              {() => (
                <TextField
                  name='cpf'
                  id='cpf'
                  label="CPF"
                  required={true}
                  margin="normal"
                  fullWidth
                />
              )}
            </InputMask>

            <InputMask
              mask="99/99/9999"
              value={formik?.values?.birthdate}
              onChange={formik.handleChange}
            >
              {() => (
                <TextField
                  name="birthdate"
                  id="birthdate"
                  required={true}
                  label="Data de Nascimento"
                  margin="normal"
                  fullWidth
                />
              )}
            </InputMask>

            <TextField
              id="address"
              label="Endereço"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && formik.errors.address ? true : false}
              helperText={formik.touched.address && formik.errors.address ? formik.errors.address : ''}
              margin="normal"
              fullWidth
            />


          </Box>
          <Box sx={{
            border: '1px dashed #C4C4C4',
            borderRadius: '4px',
            p: 3
          }}>
            <Subtitle mb={1} label="Informação dos pais" />
            <TextField
              id="motherName"
              label="Nome da mãe"
              name="motherName"
              value={formik.values.motherName}
              onChange={formik.handleChange}
              error={formik.touched.motherName && formik.errors.motherName ? true : false}
              helperText={formik.touched.motherName && formik.errors.motherName ? formik.errors.motherName : ''}
              margin="normal"
              fullWidth
            />
            <TextField
              id="fatherName"
              label="Nome do pai"
              name="fatherName"
              value={formik.values.fatherName}
              onChange={formik.handleChange}
              error={formik.touched.fatherName && formik.errors.fatherName ? true : false}
              helperText={formik.touched.fatherName && formik.errors.fatherName ? formik.errors.fatherName : ''}
              margin="normal"
              fullWidth
            />
          </Box>

        </form>
      </Box>

      <FooterLayout action={{
        label: 'Salvar',
        formId: 'submit-student',
        loading,
      }} actionDelete={{
        onClick: () => setDialog({
          open: true,
          title: 'Atenção',
          message: 'Essa ação não pode ser desfeita. Ao confirmar, esse estudante será removido.',
          handleConfirm: handleDeleteStudent
        }),
        label: 'Deletar',
        hide: !studentId
      }} />

    </Box>
  )
}