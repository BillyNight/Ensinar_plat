import { Snackbar } from "@mui/material"
import React from "react";
import { GlobalContext, GlobalContextType } from "../../contexts/global";

function ToastComponent() {
  const { toast, setToast } = React.useContext(GlobalContext) as GlobalContextType

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') { return }
    setToast({ ...toast, message: '', open: false });
  }

  // const actionButton = (
  //   <React.Fragment>
  //     <div style={{ height: "100%", display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleClose}>
  //       Fechar
  //     </div>
  //   </React.Fragment>
  // );

  return (
    <Snackbar
      sx={{ alignItems: 'flex-end', justifyContent: 'center', pointerEvents: 'none' }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={toast.open}
      autoHideDuration={5000}
      // autoHideDuration={toast.autoHideDuration}
      onClose={handleClose}
      message={toast.message}
      action={toast.action}
    />
  )
}

export default ToastComponent