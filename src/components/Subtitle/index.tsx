import React from 'react'
import { Box, Typography, IconButton, Button, TextField, Stack } from '@mui/material';

import { ArrowBackIosNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'


export default function Subtitle({ label = '', size = '', variant = 'h5', hasBack = false, onClick, mt = 0, mb = 0 }: any) {

  const navigate = useNavigate()

  return (
    <Stack direction="row" alignItems="center" spacing={1.5} mt={mt} mb={mb} height="100%">
      {
        hasBack && <IconButton
          sx={{ p: 0.5 }}
          aria-label="expand row"
          size="small"
          onClick={() => navigate(-1)}
          data-cy="show-back-button"
        >
          <ArrowBackIosNew sx={{ lineHeight: 1, color: 'primary.main' }} />
        </IconButton>
      }

      <Typography variant={variant} sx={{ m: 0, lineHeight: 1, color: 'primary.main' }} >
        {label}
      </Typography>
    </Stack>
  )
}