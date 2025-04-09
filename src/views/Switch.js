import * as React from 'react';
import { Card, CardContent, Button, Typography, Box, TextField } from '@mui/material';

const decisionFlow = {
    vlan: {
        question: "Plusieurs réseaux ? VLAN ?",
        options: {
            oui: "mgt_devices",
            non: "non_mgt_devices",
        },
    },
    mgt_devices: {
        question: "Avez-vous besoin d'alimenter des bornes WIFI, caméra IP, téléphone VOIP ?",
        options: {
            oui: "ports_mgt_poe",
            non: "ports_mgt_non_poe",
        },
    },
    non_mgt_devices: {
        question: "Avez-vous besoin d'alimenter des bornes WIFI, caméra IP, téléphone VOIP ?",
        options: {
            oui: "ports_non_mgt_poe",
            non: "ports_non_mgt_non_poe",
        },
    },
    ports_mgt_poe: {
        question: "Combien de prises réseaux avez-vous besoin ?",
        next: "final_mgt_poe",
    },
    ports_mgt_non_poe: {
        question: "Combien de prises réseaux avez-vous besoin ?",
        next: "final_mgt_non_poe",
    },
    ports_non_mgt_poe: {
        question: "Combien de prises réseaux avez-vous besoin ?",
        next: "final_non_mgt_poe",
    },
    ports_non_mgt_non_poe: {
        question: "Combien de prises réseaux avez-vous besoin ?",
        next: "final_non_mgt_non_poe",
    },
    final_mgt_poe: {
        final: "SWITCH RACKABLE MANAGEABLE ET POE DE X PORTS",
    },
    final_mgt_non_poe: {
        final: "SWITCH RACKABLE MANAGEABLE ET NON POE DE X PORTS",
    },
    final_non_mgt_poe: {
        final: "SWITCH RACKABLE NON MANAGEABLE ET POE DE X PORTS",
    },
    final_non_mgt_non_poe: {
        final: "SWITCH RACKABLE NON MANAGEABLE ET NON POE DE X PORTS",
    }
};

export default function Switch() {
    const [currentStep, setCurrentStep] = React.useState('vlan');
    const [finalResult, setFinalResult] = React.useState(null);
    const [ports, setPorts] = React.useState('');

    const handleOptionClick = (option) => {
        const nextStep = decisionFlow[currentStep]?.options?.[option] || decisionFlow[currentStep]?.next;
        if (decisionFlow[nextStep]?.final) {
            if (ports) {
                setFinalResult(decisionFlow[nextStep].final.replace('X', ports));
            } else {
                setCurrentStep(nextStep);
            }
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
                        <Button variant="contained" color="primary" className="mt-4" onClick={() => { setCurrentStep('vlan'); setFinalResult(null); setPorts(''); }}>
                            Recommencer
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h4">
                            {decisionFlow[currentStep]?.question}
                        </Typography>
                        {decisionFlow[currentStep]?.options ? (
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
                        ) : (
                            <Box>
                                {currentStep.startsWith('ports') && (
                                    <TextField
                                        type="number"
                                        value={ports}
                                        onChange={(e) => setPorts(e.target.value)}
                                        label="Nombre de prises réseaux"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />
                                )}
                                <Button variant="contained" color="primary" onClick={() => handleOptionClick()}>Suivant</Button>
                            </Box>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}
