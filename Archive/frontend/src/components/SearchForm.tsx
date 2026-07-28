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
  prescriberName: string;
  isSubmitting: boolean;
  onPrescriberNameChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

function SearchForm({
  prescriberName,
  isSubmitting,
  onPrescriberNameChange,
  onSubmit,
  onClear,
}: SearchFormProps) {
  const isValid = useMemo(() => prescriberName.trim().length >= 2, [prescriberName]);

  return (
    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Search Prescriber Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter the prescriber name to retrieve the relevant profile.
        </Typography>

        <Stack spacing={2.5}>
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
