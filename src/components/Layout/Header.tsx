import { Box, Button, Grid } from "@mui/material";
import Subtitle from "../Subtitle";

export default function HeaderLayout({ title, actions }: any) {
  return (
    <Box sx={{
      mx: 3,
      height: '4rem',
      borderBottom: '1px solid #C4C4C4',
      display: 'flex', alignItems: 'center',
      // backgroundColor: '#ffffff'
    }}>
      <Grid container>
        <Grid item flex={1}>
          <Subtitle label={title} variant={"h5"} hasBack={true} />
        </Grid>
        <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {actions?.map((action: any, index: any) => (
            <Button sx={{ display: action.hide ? 'none' : 'auto' }} key={index} color="primary" variant="contained" onClick={action.onClick}>{action.label}</Button>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}