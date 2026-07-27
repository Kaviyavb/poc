import { useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchFormProps {
  employeeEmail: string;
  prescriberName: string;
  isSubmitting: boolean;
  onEmployeeEmailChange: (value: string) => void;
  onPrescriberNameChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

function SearchForm({
  employeeEmail,
  prescriberName,
  isSubmitting,
  onEmployeeEmailChange,
  onPrescriberNameChange,
  onSubmit,
  onClear,
}: SearchFormProps) {
  const isValid = useMemo(() => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employeeEmail.trim());
    const nameValid = prescriberName.trim().length >= 2;
    return emailValid && nameValid;
  }, [employeeEmail, prescriberName]);

  return (
    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Search Prescriber Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter the employee email and prescriber name to retrieve the relevant profile.
        </Typography>

        <Stack spacing={2.5}>
          <TextField
            label="Employee Email"
            fullWidth
            value={employeeEmail}
            onChange={(event) => onEmployeeEmailChange(event.target.value)}
            placeholder="name@company.com"
            required
            error={employeeEmail.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employeeEmail.trim())}
            helperText={employeeEmail.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employeeEmail.trim()) ? 'Enter a valid email address' : ' '}
          />

          <TextField
            label="Prescriber Name"
            fullWidth
            value={prescriberName}
            onChange={(event) => onPrescriberNameChange(event.target.value)}
            placeholder="Enter prescriber name"
            required
            error={prescriberName.trim().length > 0 && prescriberName.trim().length < 2}
            helperText={prescriberName.trim().length > 0 && prescriberName.trim().length < 2 ? 'Minimum 2 characters required' : ' '}
          />

          <Box display="flex" gap={2} flexWrap="wrap">
            <Button
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              onClick={onSubmit}
              disabled={isSubmitting || !isValid}
              sx={{ minWidth: 180 }}
            >
              {isSubmitting ? 'Searching...' : 'Search'}
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ClearIcon />}
              onClick={onClear}
              sx={{ minWidth: 160 }}
            >
              Clear
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default SearchForm;
