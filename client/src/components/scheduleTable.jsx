import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatData } from '../Helper/ScheduleTable';


export default function DenseTable({dataIn}) {

    function period(row, periodNum){
    
            if(row.periodC0 === periodNum){
                return row.class0;
            }
            else if(row.periodC1 === periodNum){
                return row.class1;
            }
            else if(row.periodC2 === periodNum){
                return row.class2;
            }
            else if(row.periodC3 === periodNum){
                return row.class3;
            }
    }
    function location(row, periodNum){
        if(row.periodC0 === periodNum){
            return row.class0L;
        }
        else if(row.periodC1 === periodNum){
            return row.class1L;
        }
        else if(row.periodC2 === periodNum){
            return row.class2L;
        }
        else if(row.periodC3 === periodNum){
            return row.class3L;
        }
        else{
            return '';
        }
    }

    let rows = formatData(dataIn);

  return (
    <TableContainer sx={{ maxWidth: 1200 }}  component={Paper}>
      <Table sx={{ maxWidth: 1200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Teacher Name</TableCell>
            <TableCell align="right">Period 1</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Period 2</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Period 3</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Period 4</TableCell>
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.class1}</TableCell>
              <TableCell align="right">{row.class1L}</TableCell>
              <TableCell align="right">{row.class2}</TableCell>
              <TableCell align="right">{row.class2L}</TableCell>
              <TableCell align="right">{row.class3}</TableCell>
              <TableCell align="right">{row.class3L}</TableCell>
              <TableCell align="right">{row.class4}</TableCell>
              <TableCell align="right">{row.class4L}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}