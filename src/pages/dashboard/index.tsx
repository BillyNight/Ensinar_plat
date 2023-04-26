
import {
  Box, Paper, Typography
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import HeaderLayout from "../../components/Layout/Header";

import { GlobalContext, GlobalContextType } from '../../contexts/global';
//import LoadingComponent from '../../components/Loading';
import { getStudentsLength }from "../../api/controllers";
import LoadingComponent from "../../components/Loading";

const CardInfo = ({ label, value, onClick }: any) => {
  return (
    <Paper
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          color: "black",
          fontSize: "2rem",
          margin: 0,
        }}
      >
        {value}
      </Typography>

      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: "black",
          margin: 0,
        }}
      >
        {label}
      </Typography>
    </Paper>
  );
};

export default function DashboardAdminPage() {

  const [info, setInfo] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  async function getInfo() {
    try {
      setInfo(getStudentsLength())
      setLoading(false)
    } catch (error) {
      // console.log('erro', error)
    }
  };

  useEffect(() => { getInfo() }, []);

  if (loading) return <LoadingComponent/>
  else return (
    <>
      <HeaderLayout title={"Dashboard"} />

      <Box sx={{ p: 3 }}>
        <Typography
          variant="h4" style={{ marginBottom: '2rem', marginTop: "1rem", fontWeight: 600 }}
        >
         Alunos cadastrados
        </Typography>

        <Box
          style={{
            display: "grid",
            gridTemplateColumns: 'repeat( auto-fit, minmax(270px, 1fr) )',
            gap: "1rem",
          }}
        >
          <CardInfo label={"Total de alunos"} value={info}></CardInfo>
        </Box>
      </Box>
    </>
  );
}
