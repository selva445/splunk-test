import React from 'react';
import { Container, Typography, Divider } from '@mui/material';
import ConfigurationForm from './components/ConfigurationForm';
import ResultDisplay from './components/ResultDisplay';

interface ServerModel {
  model: string;
  rule: number;
}

function App() {
  const [results, setResults] = React.useState<ServerModel[]>([]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Server Composer
      </Typography>
      <ConfigurationForm onEvaluate={setResults} />
      <Divider sx={{ my: 4 }} />
      <ResultDisplay results={results} />
    </Container>
  );
}

export default App;
