import { useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import type { PrescriberResult } from '../types';
import { parseMedicineDetails } from '../utils/medicineParser';

interface PrescriberCardProps {
  prescriber: PrescriberResult;
}

function PrescriberCard({ prescriber }: PrescriberCardProps) {
  const [expanded, setExpanded] = useState(false);

  const medicineDetails = useMemo(() => parseMedicineDetails(prescriber.text_file), [prescriber.text_file]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prescriber.text_file);
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform 180ms ease, box-shadow 180ms ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} alignItems={{ xs: 'flex-start', md: 'center' }}>
          <Avatar
            src={prescriber.png_file}
            alt={`${prescriber.prescriber_first_name} ${prescriber.prescriber_last_name}`}
            sx={{ width: 72, height: 72, bgcolor: 'primary.main' }}
          >
            {prescriber.prescriber_first_name?.[0]}
            {prescriber.prescriber_last_name?.[0]}
          </Avatar>

          <Box flex={1}>
            <Typography variant="h6" fontWeight={700}>
              {prescriber.prescriber_first_name} {prescriber.prescriber_last_name}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
              <Chip label={`NPI: ${prescriber.npi}`} size="small" color="primary" variant="outlined" />
              <Chip label={`Territory: ${prescriber.territory}`} size="small" variant="outlined" />
              <Chip label={`HCP ID: ${prescriber.hcp_id}`} size="small" variant="outlined" />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
              Employee: {prescriber.employee_email}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2.5 }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1.5}>
          <Typography variant="subtitle2" color="text.secondary">
            Medicine details available
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" startIcon={<ContentCopyIcon />} onClick={handleCopy}>
              Copy details
            </Button>
            <Button variant="text" size="small" endIcon={<ExpandMoreIcon />} onClick={() => setExpanded((value) => !value)}>
              {expanded ? 'Hide' : 'View'}
            </Button>
          </Stack>
        </Stack>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Medicine Details
            </Typography>
            <Stack spacing={1.5}>
              {Object.entries(medicineDetails).map(([key, value]) => (
                <Box key={key}>
                  <Typography variant="caption" fontWeight={700} textTransform="capitalize" color="text.secondary">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </Typography>
                  <Typography variant="body2">{value}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default PrescriberCard;
