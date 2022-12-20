import * as React from 'react'
import { Link } from "react-router-dom";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material/';
import { styled, TableCell, tableCellClasses, TableRow, TableContainer, Paper, Table, TableHead, TableBody, Button } from '@mui/material/';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from 'axios';

// '& th:first-of-type': {
//   borderRadius: '10px 0 0 10px'
// },
// '& th:last-child': {
//   borderRadius: '0 10px 10px 0'
// }

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


class AssetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            name: "",
            assetType: "",
            tableFields: []
        }
        this.object = {key:"",value:""}
        this.keyConditionHandler = this.keyConditionHandler.bind(this);
        this.valueConditionHandler = this.valueConditionHandler.bind(this);
        this.saveFields = this.saveFields.bind(this);
        this.remove = this.remove.bind(this);
        this.nameConditionHandler = this.nameConditionHandler.bind(this);
        this.assetTypeConditionHandler = this.assetTypeConditionHandler.bind(this);
        this.save = this.save.bind(this);
    }
    keyConditionHandler(e) {
        this.object.key= e.target.value;
        this.setState({});
    }
    valueConditionHandler(e) {
        this.object.value= e.target.value;
        this.setState({});
    }
    saveFields() {
        const newObj = this.object;
        this.state.tableFields.push(newObj);
        this.object = {key:"",value:""};
        console.log(this.state);
        this.setState({});
    }
    remove(index) {
        let tempTableFields = this.state.tableFields;
        tempTableFields.splice(index, 1);
        this.setState({ tableFields: tempTableFields });
    }
    nameConditionHandler(e) {
        this.setState({name: e.target.value});
    }
    assetTypeConditionHandler(e) {
        this.setState({assetType: e.target.value});
    }
    async sendToBackEnd(payload) {
        let res = await axios.post('http://httpbin.org/post', payload);
        let data = res.data;
        console.log(data);
    }
    save() {
        console.log(this.state);
        this.sendToBackEnd(this.state);
    }
    render() {
        return (
            <div>
            <Box sx={{m:5}}>
            <h1>Asset Form</h1>

            <div>
            <Box sx={{m:0}}>
                <p>Asset Name </p>
                <Box sx={{m:2, maxWidth: 300 }}>
                  <FormControl fullWidth>
                  <TextField  value={this.state.name} id="outlined-basic" label="Enter Asset Name" variant="outlined" onChange={(e) => this.nameConditionHandler(e)} />
                  </FormControl>
                </Box>
                <p>Asset Type</p>
                <Box sx={{m:2, maxWidth: 300 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Type</InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.assetType}
                      label="type"
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      onChange={(e) => this.assetTypeConditionHandler(e)}

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
                      <MenuItem value={'File'}>File</MenuItem>
                      <MenuItem value={'Text'}>Text</MenuItem>
                    </Select>

                  </FormControl>

                </Box>

                <p>Table Fields</p>
                <Box sx={{m:2}}>
                <div style={{display: 'flex',flexDirection: 'row'}}>
                    <div>
                        <p>Key </p>
                        <TextField value={this.object.key} id="outlined-basic"  variant="outlined" onChange={(e) => this.keyConditionHandler(e)} />
                    </div>
                    <div> <p>&emsp; </p></div>
                    <div>
                        <p>Value </p>
                        <TextField value={this.object.value} id="outlined-basic"  variant="outlined" onChange={(e) => this.valueConditionHandler(e)} />
                    </div>
                    <div> <p>&emsp; </p></div>
                    <div>
                        <p></p>
                        <p></p>
                        <Button onClick={this.saveFields}>
                        <AddCircleIcon className="add-icon"/>
                        </Button>
                    </div>
                </div>
                <br></br>

                <div>
                <Box sx={{m:0, maxWidth: 600 }}>
                <TableContainer component={Paper}>
                  <Table  aria-label="customized table">
                    <TableHead >
                      <TableRow>
                        <StyledTableCell align="left">Key </StyledTableCell>
                        <StyledTableCell align="left">Value</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                    {
                        this.state.tableFields.map((item, index) => (
                            <StyledTableRow key={index}  style ={ index % 2 ? { background : "#D2EFFD" }:{ background : "#A8E0FC" }}>
                            <StyledTableCell align="left">{item.key}</StyledTableCell>
                            <StyledTableCell align="left">{item.value}</StyledTableCell>
                            <StyledTableCell align="center">
                            <Button onClick={() => this.remove(index)}> Remove </Button>
                            </StyledTableCell>
                            </StyledTableRow>
                        ))
                    }

                    </TableBody>
                  </Table>
                </TableContainer>

                </Box>
                </div>
                </Box>


            </Box>
            </div>

            <div align="right">
            <Link to="/" style={{textDecoration: 'none'}}>
                <Button variant="outlined"> Cancel </Button>
                <span> </span>
                <Button variant="contained" onClick={this.save}> Save </Button>
            </Link>

            </div>

            </Box>

            </div>
        )
    }
}

export default AssetForm;
