import { ArrowForward } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataGrid from '../../components/DataGrid';
import HeaderLayout from '../../components/Layout/Header';
import { GlobalContext, GlobalContextType } from '../../contexts/global';



export default function studentsIndex() {


  const navigate = useNavigate()
  const { students } = useContext<GlobalContextType>(GlobalContext)


  const studentsTableData: any = {
    columns: [
      {
        field: 'label',
        headerName: 'Nome',
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'entry',
        headerName: 'Matrícula',
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'birthdate',
        headerName: 'Data de nascimento',
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'actions',
        sortable: false,
        headerName: '',
        renderCell: (params: any) => {
          return (
            <div>
              <IconButton onClick={() => handleUpsert(params.id)}>
                <ArrowForward />
              </IconButton>
            </div>
          )
        },
        align: 'right',
        width: 55,
      },
    ],
    rows: students?.map((student: any, index: any) => {
      return {
        id: index,
        label: student?.name,
        entry: student?.entry,
        birthdate: new Date(student?.birthdate)?.toLocaleDateString('pt-br'),
      }
    }) || []
  }

  const handleNewStudent = () => navigate('/student/upsert')
  const handleUpsert = (studentId: any) => navigate(`/student/upsert/${studentId}`)

  const actions =  [{
      label: 'Novo estudante',
      onClick: handleNewStudent
  }]

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 0 }}>
      <HeaderLayout title="Estudantes" actions={actions} />
      <DataGrid tableData={studentsTableData} searchTextLabel="Pesquise por estudantes" />
    </Box>
  )

}
