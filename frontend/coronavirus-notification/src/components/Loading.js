import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading() {
  return (
    <div>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
        open={true}
      >
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    </div>
  );
}
