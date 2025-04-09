import * as React from 'react';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';

const decisionFlow = {
    start: {
        question: "Souris filaire ou non filaire ?",
        options: {
            oui: "souris_filaire",
            non: "souris_bluetooth_check",
        },
    },
    souris_filaire: {
        final: "SOURIS FILAIRE",
    },
    souris_bluetooth_check: {
        question: "L'ordinateur est-il Bluetooth ?",
        options: {
            oui: "souris_bluetooth",
            non: "souris_usb_dongle",
        },
    },
    souris_bluetooth: {
        final: "SOURIS BLUETOOTH",
    },
    souris_usb_dongle: {
        final: "SOURIS AVEC DONGLE USB",
    },
};

export default function Souris() {
    const [currentStep, setCurrentStep] = React.useState('start');
    const [finalResult, setFinalResult] = React.useState(null);

    const handleOptionClick = (option) => {
        const nextStep = decisionFlow[currentStep]?.options?.[option];
        if (decisionFlow[nextStep]?.final) {
            setFinalResult(decisionFlow[nextStep].final);
        } else {
            setCurrentStep(nextStep);
        }
    };

    return (
        <Card sx={{ minWidth: 450, minHeight: 300, margin: 'auto', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                {finalResult ? (
                    <>
                        <Typography variant="h5">
                            Recommandation Finale
                        </Typography>
                        <Typography variant="body1">{finalResult}</Typography>
                        <Button variant="contained" color="primary" className="mt-4" onClick={() => { setCurrentStep('start'); setFinalResult(null); }}>
                            Recommencer
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" component="h2" gutterBottom>
                            {decisionFlow[currentStep].question}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {Object.keys(decisionFlow[currentStep].options).map((option) => (
                                <Button
                                    key={option}
                                    size="large"
                                    variant="outlined"
                                    color="primary"
                                    sx={{
                                        borderRadius: '20px',
                                        backgroundColor: 'background.paper',
                                        color: 'text.primary',
                                        borderColor: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'primary.main',
                                            color: 'white'
                                        }
                                    }}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option}
                                </Button>
                            ))}
                        </Box>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
