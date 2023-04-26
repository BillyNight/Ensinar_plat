import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext } from 'react';
import { GlobalContext, GlobalContextType } from '../../contexts/global';

export default function DialogComponent() {

  const { dialog, setDialog, dismissDialog } = useContext(GlobalContext) as GlobalContextType

  const handleConfirm = async () => {
    dismissDialog()
    if (dialog.handleConfirm) await dialog.handleConfirm()
  }

  const handleCancel = async () => {
    dismissDialog()
    if (dialog.handleCancel) await dialog.handleCancel()
  };

  return (
    <Dialog
      data-cy="dialog"
      open={dialog.open}
    >
      <DialogTitle id="alert-dialog-title">
        {dialog.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialog.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>

        {
          dialog.type === 'info'
            ? <Button disabled={dialog.isSubmitting} onClick={handleCancel}>Entendido</Button>
            : <>
              <Button disabled={dialog.isSubmitting} color="error" onClick={handleCancel}>Cancelar</Button>
              <Button disabled={dialog.isSubmitting} onClick={handleConfirm} autoFocus>
                Confirmar
              </Button>
            </>
        }

      </DialogActions>
    </Dialog>
  );
}