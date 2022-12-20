import * as React from 'react'
import { Link } from "react-router-dom";
import { Box, Button } from '@mui/material/';

class Asset extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <Box sx={{m:5}}>
            <h1>Asset</h1>
            <div  align="right">
            <Link to="/asset-form" style={{textDecoration: 'none'}}>
                <Button variant="contained"> + Asset </Button>
            </Link>
            </div>
            </Box>
            </div>
        )
    }
}

export default Asset;
