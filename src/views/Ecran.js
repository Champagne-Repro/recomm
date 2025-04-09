import React, { useState } from 'react';
import { Card, CardContent, Button, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';

const decisionFlow = {
    start: {
        question: "Taille souhaitée ?",
        options: {
            "22\"": "connexion_requise",
            "24\"": "connexion_requise",
            "27\"": "connexion_requise",
            "32\"": "connexion_requise",
        },
    },
    connexion_requise: {
        question: "Connexion requise ?",
        options: {
            HDMI: "support",
            DP: "support",
            VGA: "support",
            DVI: "support",
        },
    },
    support: {
        question: "Support ajustable ?",
        options: {
            oui: "support_ajustable",
            non: "support_non_ajustable",
        },
    },
    support_ajustable: {
        question: "Besoin d'un écran tactile ?",
        options: {
            oui: "resultat_ajustable_tactile",
            non: "resultat_ajustable_non_tactile",
        },
    },
    support_non_ajustable: {
        question: "Besoin d'un écran tactile ?",
        options: {
            oui: "resultat_non_ajustable_tactile",
            non: "resultat_non_ajustable_non_tactile",
        },
    },
    resultat_ajustable_tactile: {
        final: "Écran X pouces avec des ports Y AVEC un support ajustable et tactile.",
    },
    resultat_ajustable_non_tactile: {
        final: "Écran X pouces avec des ports Y AVEC un support ajustable NON tactile.",
    },
    resultat_non_ajustable_tactile: {
        final: "Écran X pouces avec des ports Y SANS un support ajustable et tactile.",
    },
    resultat_non_ajustable_non_tactile: {
        final: "Écran X pouces avec des ports Y SANS un support ajustable NON tactile.",
    }
};

function Ecran() {
    const [currentStep, setCurrentStep] = useState('start');
    const [finalResult, setFinalResult] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedConnections, setSelectedConnections] = useState([]);

    const handleOptionClick = (option) => {
        if (currentStep === 'start') {
            setSelectedSize(option);
        }
        const nextStep = decisionFlow[currentStep]?.options?.[option] || decisionFlow[currentStep]?.next;
        if (nextStep && decisionFlow[nextStep]?.final) {
            const result = decisionFlow[nextStep].final.replace('X', selectedSize).replace('Y', selectedConnections.join(', '));
            setFinalResult(result);
        } else if (nextStep) {
            setCurrentStep(nextStep);
        }
    };

    const handleCheckboxChange = (option) => {
        setSelectedConnections((prev) => {
            if (prev.includes(option)) {
                return prev.filter((item) => item !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    return (
        <Box p={4} maxWidth="md" mx="auto">
            <Card>
                <CardContent>
                    {finalResult ? (
                        <Box textAlign="center">
                            <Typography variant="h5" component="h2" gutterBottom>
                                Recommandation Finale
                            </Typography>
                            <Typography variant="body1">{finalResult}</Typography>
                            <Button variant="contained" color="primary" onClick={() => { setCurrentStep('start'); setFinalResult(null); setSelectedSize(''); setSelectedConnections([]); }} sx={{ mt: 2 }}>
                                Recommencer
                            </Button>
                        </Box>
                    ) : (
                        <Box textAlign="center">
                            <Typography variant="h6" component="h2" gutterBottom>
                                {decisionFlow[currentStep].question}
                            </Typography>
                            {currentStep === 'connexion_requise' ? (
                                <Box display="flex" flexDirection="column" alignItems="start">
                                    {Object.keys(decisionFlow[currentStep].options).map((key) => (
                                        <FormControlLabel
                                            key={key}
                                            control={
                                                <Checkbox
                                                    checked={selectedConnections.includes(key)}
                                                    onChange={() => handleCheckboxChange(key)}
                                                />
                                            }
                                            label={key}
                                        />
                                    ))}
                                    <Button variant="contained" color="primary" onClick={() => handleOptionClick('HDMI')} sx={{ mt: 2 }}>
                                        Suivant
                                    </Button>
                                </Box>
                            ) : (
                                <Box display="flex" justifyContent="space-around">
                                    {Object.keys(decisionFlow[currentStep].options).map((key) => (
                                        <Button
                                        key={key}
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
                                        onClick={() => handleOptionClick(key)}
                                    >
                                        {key}
                                    </Button>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}

export default Ecran;
