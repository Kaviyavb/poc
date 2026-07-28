import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider', mt: 4 }}>
      <Typography variant="body2" color="text.secondary">
        Powered by Databricks · Version 1.0
      </Typography>
    </Box>
  );
}

export default Footer;
