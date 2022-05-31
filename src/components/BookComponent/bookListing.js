import React,{useState,useEffect} from 'react'
import useAuth from "../../Hooks/useAuth";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Row, Col  } from 'antd';
import { height } from '@mui/system';
export default function bookListing() {
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [books, setBooks] = useState([]);
  const [listing, setListing] = useState([]);
  const { userBooks } = useAuth();

  useEffect( () => {
    booksList();
 }, []);

 const booksList = async() =>{
  var userId ={
      user_id:localStorage.getItem('userId')
  }
 var response = await userBooks(userId).then(res => {  
    console.log(res)
    setBooks(res)
  }) .catch((error)=>{
    return error
  })
}

const columns = [
  { id: 'small_thumbnail', label: 'Small Thumbnail', minWidth: 170 },
  { id: 'thumbnail', label: 'Thumbnail', minWidth: 170 },
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'subtitle', label: 'Subtitle', minWidth: 100 },
  {
    id: 'Authors',
    label: 'authors',
    minWidth: 170,
  },
 
];
const rows = books;
const serverUrl = 'http://localhost:8000/image/';

const handleChangePage = (event, newPage) => {
  setPage(newPage);
}; 


const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};
  return (
    <>
    <Row justify="center">
      <Col span={16}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rows,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                        <TableCell> <img src={rows ? serverUrl + rows.small_thumbnail:''}  style={{width:'50px'}}/></TableCell>
                        <TableCell> <img src={rows ? serverUrl+rows.thumbnail:''}   style={{width:'50px'}}/> </TableCell>
                        <TableCell> {rows ? rows.title:''} </TableCell>
                        <TableCell>{rows ? rows.subtitle:''}</TableCell>
                        <TableCell>{rows ? rows.authors:''}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
      </Col>
    </Row>
   </>
  )
}
