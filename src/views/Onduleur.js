import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import CalculateurOnduleur from '../components/CalculateurOnduleur';

const decisionFlow = {
    baie: {
        question: "Y'a-t-il une baie ?",
        options: {
            oui: "rack_devices",
            non: "tour_devices",
        },
    },
    rack_devices: {
        question: "Devons nous prévoir d'enlever un ancien onduleur ?",
        options: {
            oui: "rack_deee_devices",
            non: "rack_no_deee_devices",
        },
    },
    tour_devices: {
        question: "Devons nous prévoir d'enlever un ancien onduleur ?",
        options: {
            oui: "tour_deee_devices",
            non: "tour_no_deee_devices",
        },
    },
    rack_deee_devices: {
        question: "Y'a t-il une prise électrique à proximité ?",
        options: {
            oui: "calcul_rack_deee",
            non: "calcul_rack_rallonge_deee",
        },
    },
    rack_no_deee_devices: {
        question: "Y'a t-il une prise électrique à proximité ?",
        options: {
            oui: "calcul_rack",
            non: "calcul_rack_rallonge",
        },
    },
    tour_deee_devices: {
        question: "Y'a t-il une prise électrique à proximité ?",
        options: {
            oui: "calcul_tour_deee",
            non: "calcul_tour_rallonge_deee",
        },
    },
    tour_no_deee_devices: {
        question: "Y'a t-il une prise électrique à proximité ?",
        options: {
            oui: "calcul_tour",
            non: "calcul_tour_rallonge",
        },
    },
    calcul_rack: {
        question: "Calcul de la capacité nécessaire",
        component: CalculateurOnduleur,
        next: "final_rack",
    },
    calcul_rack_rallonge: {
        question: "Calcul de la capacité nécessaire",
        component: CalculateurOnduleur,
        next: "final_rack_rallonge",
    },
    calcul_rack_deee: {
        question: "Calcul de la capacité nécessaire",
        component: CalculateurOnduleur,
        next: "final_rack_deee",
    },
    calcul_rack_rallonge_deee: {
        question: "Calcul de la capacité nécessaire",
        component: CalculateurOnduleur,
        next: "final_rack_rallonge_deee",
    },
    calcul_tour: {
        question: "Calcul de la capacité nécessaire",
        component: CalculateurOnduleur,
        next: "final_tour",
    },
    calcul_tour_rallonge: {
        question: "Calcul de la capacité nécessaire",
        component: CalculateurOnduleur,
        next: "final_tour_rallonge",
    },
    calcul_tour_deee: {
        question: "Calcul de la capacité nécessaire",
        component: CalculateurOnduleur,
        next: "final_tour_deee",
    },
    calcul_tour_rallonge_deee: {
        question: "Calcul de la capacité nécessaire",
        component: CalculateurOnduleur,
        next: "final_tour_rallonge_deee",
    },
    final_tour: {
        final: "UN ONDULEUR TOUR (X VA, Y W)",
    },
    final_tour_rallonge: {
        final: "UN ONDULEUR TOUR, PRÉVOIR UNE RALLONGE (X VA, Y W)",
    },
    final_tour_rallonge_deee: {
        final: "UN ONDULEUR TOUR, PRÉVOIR UNE RALLONGE ET MISE EN DEEE (X VA, Y W)",
    },
    final_tour_deee: {
        final: "UN ONDULEUR TOUR, PRÉVOIR MISE EN DEEE (X VA, Y W)",
    },
    final_rack_rallonge: {
        final: "UN ONDULEUR RACKABLE, PRÉVOIR UNE RALLONGE (X VA, Y W)",
    },
    final_rack: {
        final: "UN ONDULEUR RACKABLE (X VA, Y W)",
    },
    final_rack_deee: {
        final: "UN ONDULEUR RACKABLE, PRÉVOIR MISE EN DEEE (X VA, Y W)",
    },
    final_rack_rallonge_deee: {
        final: "UN ONDULEUR RACKABLE, PRÉVOIR UNE RALLONGE ET MISE EN DEEE (X VA, Y W)",
    }
};

function Onduleur() {
    const [currentStep, setCurrentStep] = useState('baie');
    const [finalResult, setFinalResult] = useState(null);
    const [puissanceVA, setPuissanceVA] = useState(0);
    const [puissanceW, setPuissanceW] = useState(0);

    const handleOptionClick = (option) => {
        const nextStep = decisionFlow[currentStep]?.options?.[option];
        if (decisionFlow[nextStep]?.final) {
            const result = decisionFlow[nextStep].final
                .replace('X', puissanceVA)
                .replace('Y', puissanceW);
            setFinalResult(result);
        } else {
            setCurrentStep(nextStep);
        }
    };

    const handleCalculComplete = (va, w) => {
        setPuissanceVA(va);
        setPuissanceW(w);
        const nextStep = decisionFlow[currentStep]?.next;
        if (nextStep && decisionFlow[nextStep]?.final) {
            const result = decisionFlow[nextStep].final
                .replace('X', va)
                .replace('Y', w);
            setFinalResult(result);
        } else if (nextStep) {
            setCurrentStep(nextStep);
        }
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
                            <Button variant="contained" color="primary" onClick={() => { setCurrentStep('baie'); setFinalResult(null); setPuissanceVA(0); setPuissanceW(0); }} sx={{ mt: 2 }}>
                                Recommencer
                            </Button>
                        </Box>
                    ) : (
                        <Box textAlign="center">
                            {currentStep.startsWith('calcul_') ? (
                                <CalculateurOnduleur onCalculComplete={handleCalculComplete} />
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
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}

export default Onduleur;

