import React, { Component } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#367CA3",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

class Modal extends Component {

    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.state = {
            Id: props.Id,
            Type: props.Type,
            Name: props.Name,
            Rank: props.Rank,
            Phone: props.Phone,
            Condition: props.Condition,
            Value: props.Value,
            tableFields: props.tableFields
        }
        this.tf = this.state.tableFields.map(a => {return {...a}});
    }
    ConditionHandler(e) {
        this.setState({ Condition: e.target.value });
        if (e.target.value === "All Required") {
            for(var i = 0; i < this.tf.length; i++) {
                this.tf[i].Check = true;
            }
        }else {
            let flag = true;
            for( i = 0; i < this.tf.length; i++) {
                if (!this.state.tableFields[i].Check) flag = false;
            }
            if (flag) {
                for( i = 0; i < this.tf.length; i++) {
                    this.tf[i].Check = false;
                }
            }
        }
    }
    async sendToBackEnd(payload) {
        let res = await axios.post('http://httpbin.org/post', payload);
        let data = res.data;
    }
    handleSave() {
        this.state.tableFields = this.tf.map(a => {return {...a}});
        const item = this.state;
        this.sendToBackEnd(item);
        this.props.saveModalDetails(item);
    }
    handleIncrement () {
        this.setState({ Value: this.state.Value + 1 });
    };
    handleDecrement (){
        this.setState({ Value: this.state.Value - 1 });
    };
    handleModalClose (){
        this.props.handleClose();
    }
    handleCheckChange (index){
        this.tf[index].Check = !this.tf[index].Check;
        let flag = true;
        for(var i = 0; i < this.tf.length; i++) {
            if (!this.tf[i].Check) flag = false;
        }
        if (flag) {
            this.setState({ Condition: "All Required" });
        }else {this.setState({ Condition: "Optional" });}
    }
    render() {

        return (

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <p align="right">
                        <Button type="button" sx={{ fontSize: '25px'}} className="close" data-dismiss="modal" aria-label="Close"  onClick={() => { this.handleModalClose() }}>
                            <span aria-hidden="true">&times;</span>
                        </Button>
                        </p>
                            <h3 className="modal-title" id="exampleModalLabel">{this.state.Name}</h3>

                        </div>
                        <div className="modal-body" display="flex" flex-direction="row">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <div>
                            <p>Select Access Type</p>
                            <Box sx={{m:1, minWidth: 300 }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={this.state.Condition}
                                  label="type"
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                  onChange={(e) => this.ConditionHandler(e)}
                                  MenuProps={{
                                    PaperProps: {
                                      sx: {

                                        "& .MuiMenuItem-root": {
                                          backgroundColor: "#123356",
                                          color: "white"
                                        },
                                        "& .MuiMenuItem-root.Mui-selected": {
                                          backgroundColor: "#123356",
                                          color: "white"
                                        },
                                        "& .MuiMenuItem-root:hover": {
                                          backgroundColor: "#4BA5E2"
                                        },
                                        "& .MuiMenuItem-root.Mui-selected:hover": {
                                          backgroundColor: "#4BA5E2"
                                        }
                                      }
                                    }
                                  }}
                                >
                                  <MenuItem value={'All Required'}>All Required</MenuItem>
                                  <MenuItem value={'Optional'}>Optional</MenuItem>
                                </Select>

                              </FormControl>
                            </Box>
                            </div>
                            <span> </span>
                            <div >
                            <p> Value</p>
                            <ButtonGroup size="small" aria-label="small outlined button group" >

                            <Button disabled={this.state.Value >= 100} style={{ textTransform: "none", padding: "15px 30px" }} onClick={()=> {this.handleIncrement()}}>+</Button>

                                {<Button disabled style={{ textTransform: "none", padding: "16px 30px" }}>{this.state.Value}</Button>}
                                {<Button disabled={this.state.Value <= 0} style={{ textTransform: "none", padding: "15px 30px" }} onClick={() => {this.handleDecrement()}}> - </Button>}
                            </ButtonGroup>
                            </div>
                        </div>
                        </div>

                        <br/>
                        <div>
                        <TableContainer component={Paper}>
                          <Table  aria-label="customized table">
                            <TableHead>
                              <TableRow>
                                <StyledTableCell align="left">Name </StyledTableCell>
                                <StyledTableCell align="left">Type</StyledTableCell>
                                <StyledTableCell align="left">Mandatory</StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>

                            {
                                this.tf.map((item, index) => (
                                    <StyledTableRow key={index} style ={ index % 2 ? { background : "#D2EFFD" }:{ background : "#A8E0FC" }}>
                                    <StyledTableCell align="left">{item.Name}</StyledTableCell>
                                    <StyledTableCell align="left">{item.Type}</StyledTableCell>
                                    <StyledTableCell align="left">

                                    <Checkbox
                                    checked={item.Check}
                                    onChange={() => this.handleCheckChange(index)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />

                                    </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }

                            </TableBody>
                          </Table>
                        </TableContainer>


                        </div>
                        <br/>
                        <div className="modal-footer" align="right">
                            <Button variant="outlined" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.handleModalClose() }}>Cancel</Button>
                            <span> </span>
                            <Button variant="contained" type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave(this.state.c, this.state.v) }}>Save changes</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
