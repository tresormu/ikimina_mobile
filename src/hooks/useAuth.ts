import { useState, useEffect, useCallback } from 'react';
import { User } from '../types';

// Module-level state so all hook instances share the same auth state
let _isAuthenticated = false;
let _user: User | null = null;
let _listeners: Array<() => void> = [];

const notify = () => _listeners.forEach((fn) => fn());

export const useAuth = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate((n) => n + 1);
    _listeners.push(listener);
    return () => {
      _listeners = _listeners.filter((l) => l !== listener);
    };
  }, []);

  const login = useCallback((userData: User) => {
    _isAuthenticated = true;
    _user = userData;
    notify();
  }, []);

  const logout = useCallback(() => {
    _isAuthenticated = false;
    _user = null;
    notify();
  }, []);

  return {
    isAuthenticated: _isAuthenticated,
    user: _user,
    loading: false,
    login,
    logout,
  };
};
