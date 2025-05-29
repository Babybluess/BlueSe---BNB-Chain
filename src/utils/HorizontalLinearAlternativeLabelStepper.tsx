import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function HorizontalLinearAlternativeLabelStepper() {
  const steps = ['100 Likes', '100 Comments', '100 shares'];

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper alternativeLabel>
        {steps.map((label: any, index: number) => (
          <Step key={label} className=" flex flex-col justify-center items-center">
            <StepLabel>{label}</StepLabel>
            <button
              onClick={() => alert('You are not qualified yet')}
              className=" px-2 py-1 rounded-lg bg-green-400 text-white shadow-inner shadow-slate-200"
            >
              Claim
            </button>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
