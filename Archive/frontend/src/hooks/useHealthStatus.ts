import { useEffect, useState } from 'react';
import api from '../services/api';

export function useHealthStatus() {
  const [healthy, setHealthy] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkHealth = async () => {
      try {
        const response = await api.get('/health');
        if (mounted) {
          const status = Array.isArray(response.data) && response.data[0]?.status === '1';
          setHealthy(status);
        }
      } catch {
        if (mounted) {
          setHealthy(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkHealth();
    const interval = window.setInterval(checkHealth, 30000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return { healthy, loading };
}
