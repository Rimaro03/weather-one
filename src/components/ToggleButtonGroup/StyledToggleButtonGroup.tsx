import styled from "@emotion/styled";
import { ToggleButtonGroup } from "@mui/material";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: 2,
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: 5,
        },
        '&:first-of-type': {
            borderRadius: 5,
        },
    },
}));

export default StyledToggleButtonGroup;