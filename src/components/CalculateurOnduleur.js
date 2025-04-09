import React, { useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

const equipements = [
    { nom: 'Ordinateur portable', watt: 70, va: 100 },
    { nom: 'Ordinateur fixe', watt: 300, va: 429 },
    { nom: 'Serveur', watt: 0, va: 0, custom: true },
    { nom: 'Beemo (mini-PC)', watt: 60, va: 86 },
    { nom: 'NAS', watt: 100, va: 143 },
    { nom: 'Switch réseau', watt: 50, va: 71 },
    { nom: 'Routeur', watt: 20, va: 29 },
    { nom: 'Borne Wi-Fi', watt: 15, va: 21 },
    { nom: 'Écran (24")', watt: 40, va: 57 },
];

export default function CalculateurOnduleur({ onCalculComplete }) {
    const [equipementsSelectionnes, setEquipementsSelectionnes] = useState([]);
    const [equipementActuel, setEquipementActuel] = useState('');
    const [quantite, setQuantite] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [customWatt, setCustomWatt] = useState('');
    const [customVA, setCustomVA] = useState('');

    const totalWatt = equipementsSelectionnes.reduce((acc, curr) => acc + (curr.watt * curr.quantite), 0);
    const totalVA = equipementsSelectionnes.reduce((acc, curr) => acc + (curr.va * curr.quantite), 0);

    const handleAjouterEquipement = () => {
        if (equipementActuel && quantite > 0) {
            const equipement = equipements.find(e => e.nom === equipementActuel);
            if (equipement) {
                if (equipement.custom) {
                    setOpenDialog(true);
                } else {
                    setEquipementsSelectionnes([
                        ...equipementsSelectionnes,
                        { ...equipement, quantite }
                    ]);
                    setEquipementActuel('');
                    setQuantite(1);
                }
            }
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setCustomWatt('');
        setCustomVA('');
    };

    const handleDialogSubmit = () => {
        if (customWatt && customVA && equipementActuel) {
            const equipement = equipements.find(e => e.nom === equipementActuel);
            if (equipement) {
                setEquipementsSelectionnes([
                    ...equipementsSelectionnes,
                    {
                        ...equipement,
                        quantite,
                        watt: parseInt(customWatt),
                        va: parseInt(customVA)
                    }
                ]);
                setEquipementActuel('');
                setQuantite(1);
                handleDialogClose();
            }
        }
    };

    const handleSupprimerEquipement = (index) => {
        setEquipementsSelectionnes(equipementsSelectionnes.filter((_, i) => i !== index));
    };

    const handleValider = () => {
        if (onCalculComplete) {
            onCalculComplete(totalVA, totalWatt);
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Calcul de la capacité de l'onduleur
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Ajouter un équipement
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Équipement</InputLabel>
                                <Select
                                    value={equipementActuel}
                                    onChange={(e) => setEquipementActuel(e.target.value)}
                                    label="Équipement"
                                >
                                    {equipements.map((equipement) => (
                                        <MenuItem key={equipement.nom} value={equipement.nom}>
                                            {equipement.nom}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                type="number"
                                label="Quantité"
                                value={quantite}
                                onChange={(e) => setQuantite(Math.max(1, parseInt(e.target.value) || 1))}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleAjouterEquipement}
                                fullWidth
                            >
                                Ajouter
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Résumé
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Puissance totale (W): {totalWatt} W
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Puissance apparente (VA): {totalVA} VA
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleValider}
                                sx={{ mt: 2 }}
                                fullWidth
                            >
                                Valider
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Équipement</TableCell>
                            <TableCell align="right">Quantité</TableCell>
                            <TableCell align="right">Puissance (W)</TableCell>
                            <TableCell align="right">Puissance (VA)</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {equipementsSelectionnes.map((equipement, index) => (
                            <TableRow key={index}>
                                <TableCell>{equipement.nom}</TableCell>
                                <TableCell align="right">{equipement.quantite}</TableCell>
                                <TableCell align="right">{equipement.watt * equipement.quantite} W</TableCell>
                                <TableCell align="right">{equipement.va * equipement.quantite} VA</TableCell>
                                <TableCell align="right">
                                    <Button
                                        color="error"
                                        onClick={() => handleSupprimerEquipement(index)}
                                    >
                                        Supprimer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Spécifications du serveur</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Puissance (W)"
                        type="number"
                        fullWidth
                        value={customWatt}
                        onChange={(e) => setCustomWatt(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Puissance apparente (VA)"
                        type="number"
                        fullWidth
                        value={customVA}
                        onChange={(e) => setCustomVA(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Annuler</Button>
                    <Button onClick={handleDialogSubmit} variant="contained" color="primary">
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
} 