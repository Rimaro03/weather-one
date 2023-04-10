import { Alert, Snackbar, useScrollTrigger } from "@mui/material";
import React, { useState } from "react";

export default function Snack({open ,setOpen, text}) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {text}
            </Alert>
        </Snackbar>
    );
}