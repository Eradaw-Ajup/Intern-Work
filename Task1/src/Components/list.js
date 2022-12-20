
import Modal from './Modal.js';


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modaltag from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from  '@mui/material/';


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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  // height: 600 ,
  overflow:'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 10,
  p: 5,
};

class List extends React.Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.state = {
      requiredItem: 0,
      brochure: [
          {
              "Id":"1",
              "Name" : "Rank Verification",
              "Type":"PC",
              "Condition": "All Required",
              "Rank" : "Major",
              "Phone":"123",
              "Value":5,
              "tableFields":[
                  {
                      Name: "Value1",
                      Type: "UA",
                      Check: true
                  },
                  {
                      Name: "Value2",
                      Type: "UA",
                      Check: true
                  },
                  {
                      Name: "Value3",
                      Type: "OA",
                      Check: true
                  }
              ]

          },
          {
          	"Id":"2",
            "Name" : "Identity Check",
            "Condition": "All Required",
            "Rank" : "Major",
          	"Type":"LC",
          	"Phone":"127",
            "Value":5,
            "tableFields":[
                {
                    Name: "Value1",
                    Type: "UA",
                    Check: true
                },
                {
                    Name: "Value2",
                    Type: "UA",
                    Check: true
                },
                {
                    Name: "Value3",
                    Type: "OA",
                    Check: true
                }
            ]
          },
          {
          	"Id":"3",
            "Name": "Phone Verification",
            "Condition": "Optional",
            "Rank" : "Major",
          	"Type":"PC",
          	"Phone":"163",
            "Value":5,
            "tableFields":[
                {
                    Name: "Value1",
                    Type: "UA",
                    Check: false
                },
                {
                    Name: "Value2",
                    Type: "UA",
                    Check: false
                },
                {
                    Name: "Value3",
                    Type: "OA",
                    Check: false
                }
            ]
          }
      ],

    open: false,
    setOpen: false
    }
  }
  replaceModalItem(index) {
    this.setState({
      requiredItem: index
    });
    this.handleOpen();
  }
  saveModalDetails(item) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.brochure;
    tempbrochure[requiredItem] = item;
    this.setState({ brochure: tempbrochure });
    this.handleClose();
  }
  deleteItem(index) {
    let tempBrochure = this.state.brochure;
    tempBrochure.splice(index, 1);
    this.setState({ brochure: tempBrochure });
  }
  handleOpen () {
      this.setState({ open: true });
  }
  handleClose () {
      this.setState({ open: false });
  }

  render() {
    const brochure = this.state.brochure.map((item, index) => {
      return (

                    <StyledTableRow key={index} style ={ index % 2 ? { background : "#D2EFFD" }:{ background : "#A8E0FC" }}>
                    <StyledTableCell align="right">{item.Id}</StyledTableCell>
                    <StyledTableCell align="left">{item.Name}</StyledTableCell>
                    <StyledTableCell align="left">{item.Type}</StyledTableCell>
                    <StyledTableCell align="left">{item.Condition}</StyledTableCell>
                    <StyledTableCell align="center">

                    <Button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                      onClick={() => this.replaceModalItem(index)}><EditIcon/></Button> {" "}

                    </StyledTableCell>
                    </StyledTableRow>

      )
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.brochure[requiredItem];
    return (
      <div>

        <h1 style = {{textAlign: 'center'}}>POLICIES : Conditions</h1>
        <div style = {{border: '50px  solid rgba(0, 0, 0, 0)'}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 900 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Id </StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Type</StyledTableCell>
                <StyledTableCell align="left">Condition</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

            {brochure}

            </TableBody>
          </Table>
        </TableContainer>


        </div>
        <Modaltag
           hideBackdrop
           open={this.state.open}
           onClose={this.handleClose}
           aria-labelledby="child-modal-title"
           aria-describedby="child-modal-description">

           <Box sx={style}>
           <div>
           < Modal
             Id = {modalData.Id}
             Type = {modalData.Type}
             Name = {modalData.Name}
             Rank = {modalData.Rank}
             Phone = {modalData.Phone}
             Condition={modalData.Condition}
             Value={modalData.Value}
             tableFields={modalData.tableFields}
             saveModalDetails={this.saveModalDetails}
             handleClose={this.handleClose}
           />
           </div>

           </Box>

        </Modaltag>

        </div>
    );
  }
}

export default List;
