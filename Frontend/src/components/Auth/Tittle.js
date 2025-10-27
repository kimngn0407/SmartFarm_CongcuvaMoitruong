import { Typography } from '@mui/material'
import React from 'react'

export default function Tittle({ tittle }) {
    return (
        <Typography component="h1" variant="h5" align="center">
            {tittle}
        </Typography>
    )
}
