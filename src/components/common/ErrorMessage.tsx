import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ErrorMessageProps {
  error: string | null | undefined;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  if (!error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
  },
  retryButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ErrorMessage;
