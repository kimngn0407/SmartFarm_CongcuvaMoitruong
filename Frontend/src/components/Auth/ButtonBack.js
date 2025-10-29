import React from 'react'
import { Link } from 'react-router-dom'
import {

    Button,
} from '@mui/material';
export default function ButtonBack({ path, tittle, variant }) {
    return (
        <div>
            <Button
                component={Link}
                to={path}
                variant={variant}
                fullWidth
            >
                {tittle}
            </Button>
        </div>
    )
}
