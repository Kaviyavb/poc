import { Box, Chip, Stack, Typography } from '@mui/material';
import { Circle } from '@mui/icons-material';
import { useHealthStatus } from '../hooks/useHealthStatus';

function Header() {
  const { healthy, loading } = useHealthStatus();

  const statusLabel = loading ? 'Checking...' : healthy ? 'Connected' : 'Disconnected';
  const statusColor = loading ? 'default' : healthy ? 'success' : 'error';

  return (
    <Box
      component="header"
      sx={{
        px: { xs: 2, md: 4 },
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1.5}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="primary.main">
            Prescriber Search Portal
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Search prescriber information with confidence
          </Typography>
        </Box>
        <Chip
          icon={<Circle fontSize="small" />}
          label={statusLabel}
          color={statusColor as 'default' | 'success' | 'error'}
          variant="outlined"
          sx={{ fontWeight: 600 }}
        />
      </Stack>
    </Box>
  );
}

export default Header;
