import { Box, Button } from "@mui/material";

export default function FooterLayout({ action, dataCy, actionDelete }: any) {
  return (
    <Box sx={{
      px: 2.5, height: '4rem',
      borderTop: '1px solid #C4C4C4',
      display: 'flex', alignItems: 'center',
      width: '100%'
      // backgroundColor: '#ffffff'
    }}>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: 3 }}>
        <Button disabled={action?.disabled} data-cy={dataCy} sx={{ width: '200px' }} form={action.formId} type="submit" color="primary" variant="contained" onClick={action.onClick}>{action.label}</Button>
        {
          (actionDelete?.onClick) && (!actionDelete?.hide) && <Button data-cy={`${dataCy}-delete`} sx={{ width: '200px' }} form={action.formId} type="button" color="error" variant="outlined" onClick={actionDelete?.onClick}>{actionDelete?.label}</Button>
        }
      </Box>

    </Box>
  )
}