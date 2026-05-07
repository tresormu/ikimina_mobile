import { useState, useEffect } from 'react';
import { mockGroup, mockUser, mockContributions } from '../data/mockData';

export const useGroupData = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setData({
        group: mockGroup,
        user: mockUser,
        contributions: mockContributions
      });
      setLoading(false);
    }, 1500);
  }, []);

  return { loading, data };
};
