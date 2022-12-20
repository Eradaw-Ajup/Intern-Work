import * as React from 'react';
import {Button, FormControl, MenuItem, InputLabel, Box, Select} from '@material-ui/core';
import axios from 'axios';

class PolicySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requiredItem: 0,
            data: [
                {"id": 1,"name": "Key Management"},
                {"id": 2,"name": "Role Management"},
                {"id": 3,"name": "Resource Management"},
            ]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.axios = require('axios');
    }
    handleChange(e) {
        this.state.requiredItem = e.target.value;
        this.setState({});
    }
    handleCancel () {

    }
    async sendToBackEnd(payload) {
        let res = await axios.post('http://httpbin.org/post', payload);
        let data = res.data;
    }
    handleSave () {
        const item=this.state.data[this.state.requiredItem];
        this.sendToBackEnd(item);
        this.props.savePolicy(item);
    }
    createPolicy (){

    }
    render () {
        return (
            <div margin="40px">
            <h1>Policy Assets</h1>
            <p align = "right">
                <Button variant="contained" color="primary" onClick={this.createPolicy}>Create New Policy</Button>
            </p>
          <Box sx={{ m:1, maxWidth: 300 }}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Policy</InputLabel>
          <Select

              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.requiredItem}
              label="Policy"
              onChange={(e) => this.handleChange(e)}>

              <MenuItem value={0}>Key Management</MenuItem>
              <MenuItem value={1}>Role Management</MenuItem>
              <MenuItem value={2}>Resource Management</MenuItem>
          </Select>
          </FormControl>
          </Box>

            <p align="right">
                <Button variant="outlined"  onClick={this.handleCancel}> Cancel </Button>
                <label />
                <Button variant="contained" color="primary" onClick={this.handleSave}> Save </Button>
            </p>
            </div>
        );
    }
}
export default PolicySelect;
