import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  List,
} from "@mui/material";
import {
  CheckCircle,
} from "@mui/icons-material";

interface ServerModel {
  model: string;
  rule: number;
}

interface Props {
  results: ServerModel[];
}

const ResultDisplay: React.FC<Props> = ({ results }) => {
  return (
    <div>
      <Typography variant="h6">Server Model Options</Typography>
      <List>
        {results &&
          results.map((result, index) => (
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <CheckCircle color="success" />
                  <Typography variant="subtitle1" fontWeight="medium">
                    {result.model}
                  </Typography>
                  <Chip
                    label={`Rule ${result.rule}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Recommended for your specified configuration requirements
                </Typography>
              </CardContent>
            </Card>
          ))}
      </List>
    </div>
  );
};

export default ResultDisplay;
