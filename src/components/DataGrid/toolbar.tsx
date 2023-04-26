import { useContext } from 'react'
import { Close } from '@mui/icons-material';
import { Box, FormControl, InputAdornment, TextField } from '@mui/material';
import { createSvgIcon } from '@mui/material/utils';
import { GridSearchIcon, GridToolbarContainer } from '@mui/x-data-grid';
import { GlobalContext, GlobalContextType } from '../../contexts/global';

export default function CustomDataGridMuiToolbar({ searchTextLabel, onChange, value, clearSearch }: any) {

  return (
    <GridToolbarContainer style={{ width: '100%', position: 'absolute', bottom: -18 }}>
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem' }}>
        <FormControl variant="outlined" size="small">
          <TextField
            id="datagrid-search-bar"
            type="text"
            size='small'
            value={value}
            sx={{ width: '300px', borderRadius: '4px' }}
            placeholder={'Digite para pesquisar...'}
            onChange={onChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                {value.length > 0
                  ? <Close onClick={clearSearch} style={{ cursor: 'pointer' }} />
                  : <GridSearchIcon />
                }
              </InputAdornment>
            }}
          />
        </FormControl>

  


      </Box>
    </GridToolbarContainer>
  );

}