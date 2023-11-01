import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, ButtonBase, Card, CardContent, Typography, Stack, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface Translation {
  keyword: string;
  translations: {
    '1': string;
    '2': string;
    '3': string;
  };
}

interface State extends SnackbarOrigin {
  open: boolean;
}

const TranslationList = ({ searchTerm, data }: { searchTerm: string; data: Translation[] }) => {
  const [alertState, setAlertOpen] = useState<State>({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });

  const { vertical, horizontal, open } = alertState;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen({ ...alertState, open: false });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setAlertOpen({ ...alertState, open: true });
  };

  const CopyToClipboardText: React.FC<{ text: string }> = ({ text }) => {
    const handleCopyClick = () => {
      copyToClipboard(text);
    };

    return (
      <ButtonBase component="div" onClick={handleCopyClick}>
        <Card sx={{ minWidth: '100%', marginTop: '5px' }}>
          <CardContent sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ cursor: 'pointer' }} >
              {text}
            </Typography>
          </CardContent>
        </Card>
      </ButtonBase>
    );
  };

  const filteredData = data.filter((item) => item.keyword.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} sx={{ boxSizing: 'border-box', position: 'fixed', zIndex: 9999 }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          <Typography>Text copied to clipboard!</Typography>
        </Alert>
      </Snackbar>
      {filteredData.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{item.keyword}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack sx={{ minWidth: '100%', width: '100%' }}>
              <CopyToClipboardText text={item.translations['1']} />
              <CopyToClipboardText text={item.translations['2']} />
              <CopyToClipboardText text={item.translations['3']} />
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default TranslationList;
