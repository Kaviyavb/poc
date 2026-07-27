import { useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';
import PrescriberCard from '../components/PrescriberCard';
import api from '../services/api';
import type { PrescriberResult, PrescriberSearchResponse } from '../types';

function SearchPage() {
  const [prescriberName, setPrescriberName] = useState('');
  const [results, setResults] = useState<PrescriberResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('DEBUG frontend request params', {
        prescriber_name: prescriberName.trim(),
      });

      const response = await api.get<PrescriberSearchResponse>('/prescriber-search', {
        params: {
          prescriber_name: prescriberName.trim(),
        },
      });

      if (response.data?.results) {
        setResults(response.data.results);
      } else {
        setResults([]);
      }
    } catch (err) {
      setError('Unable to load prescriber information right now. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPrescriberName('');
    setResults([]);
    setError(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%)' }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={3}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h3" fontWeight={800} color="primary.main">
              Search Prescriber Information
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Retrieve the prescriber profile and medicine details in a secure, enterprise-ready view.
            </Typography>
          </Box>

          <SearchForm
            prescriberName={prescriberName}
            isSubmitting={isLoading}
            onPrescriberNameChange={setPrescriberName}
            onSubmit={handleSearch}
            onClear={handleClear}
          />

          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" variant="filled">
              {error}
            </Alert>
          )}

          {!isLoading && !error && results.length === 0 && (
            <Box
              sx={{
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 4,
                py: 8,
                textAlign: 'center',
                backgroundColor: 'background.paper',
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                No Prescribers Found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try another search combination to find a matching prescriber.
              </Typography>
            </Box>
          )}

          {!isLoading && !error && results.length > 0 && (
            <Stack spacing={2}>
              {results.map((prescriber) => (
                <PrescriberCard key={`${prescriber.emp_id}-${prescriber.hcp_id}`} prescriber={prescriber} />
              ))}
            </Stack>
          )}
        </Stack>
      </Container>
      <Footer />
    </Box>
  );
}

export default SearchPage;
