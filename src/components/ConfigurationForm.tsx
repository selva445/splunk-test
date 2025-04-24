import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button } from '@mui/material';
import { evaluateConfiguration } from '../utils/rulesEvaluator';

interface ServerModel {
  model: string;
  rule: number;
}

interface Props {
  onEvaluate: (results: ServerModel[]) => void;
}

const ConfigurationForm: React.FC<Props> = ({ onEvaluate }) => {
  const [cpu, setCpu] = useState('');
  const [memoryInput, setMemoryInput] = useState('');
  const [gpu, setGpu] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const memoryStrings = memoryInput.split(',').map(s => s.trim());
    const memoryNumbers = memoryStrings.map(Number);
    if (memoryNumbers.some(isNaN)) {
      setError('Invalid memory format. Use comma separated integers.');
      onEvaluate([{ model: 'No Options', rule: 5 }]);
      return;
    }
    if (!cpu) {
      setError('CPU selection is required');
      onEvaluate([{ model: 'No Options', rule: 5 }]);
      return;
    }
    
    if (!memoryInput.trim()) {
      setError('Memory Size is required');
      onEvaluate([{ model: 'No Options', rule: 5 }]);
      return;
    }
    const results = evaluateConfiguration(cpu, memoryNumbers, gpu);
    onEvaluate(results.length ? results : [{ model: 'No Options', rule: 4/5 }]);
    setError('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>CPU</InputLabel>
        <Select value={cpu} label="CPU" onChange={(e) => setCpu(e.target.value)}>
          <MenuItem value="X86">X86</MenuItem>
          <MenuItem value="Power">Power</MenuItem>
          <MenuItem value="ARM">ARM</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Memory Size (MB, comma-separated)"
        multiline
        minRows={2}
        value={memoryInput}
        onChange={(e) => setMemoryInput(e.target.value)}
      />

      <FormControlLabel
        control={<Checkbox checked={gpu} onChange={() => setGpu(!gpu)} />}
        label="GPU Accelerator Card"
      />

      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Box>
  );
};

export default ConfigurationForm;
