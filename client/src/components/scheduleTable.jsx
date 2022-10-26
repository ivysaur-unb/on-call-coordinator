import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function DenseTable({dataIn}) {
    function formatData(rows){
        for(let i = 0; i<dataIn.length; i++){
            let temp = {};
            temp['name'] = dataIn[i].name;
            console.log(dataIn[i]);

            if(dataIn[i].classes){
                if(dataIn[i].classes[0]){
                    temp['class0'] = dataIn[i].classes[0].code;
                    temp['periodC0'] = dataIn[i].classes[0].period;
                    if(dataIn[i].classes[0].location){
                        temp['classL0'] = dataIn[i].classes[0].location
                    }
                    else{
                        temp['classL0'] = 'test'
                    }
                }
                else{
                    temp['class0'] = '';
                }
                


                if(dataIn[i].classes[1]){
                    temp['class1'] = dataIn[i].classes[1].code;
                    temp['periodC1'] = dataIn[i].classes[1].period;
                    if(dataIn[i].classes[1].location){
                        temp['class1L'] = dataIn[i].classes[1].location
                    }
                    else{
                        temp['class1L'] = ''
                    }
                }
                else{
                    temp['class1'] = '';
                }
                


                if(dataIn[i].classes[2]){
                    temp['class2'] = dataIn[i].classes[2].code;
                    temp['periodC2'] = dataIn[i].classes[2].period;
                    if(dataIn[i].classes[2].location){
                        temp['class2L'] = dataIn[i].classes[2].location
                    }
                    else{
                        temp['class2L'] = '';
                    }
                }
                else{
                    temp['class2'] = '';
                }
            

                if(dataIn[i].classes[3]){
                    temp['class3'] = dataIn[i].classes[3].code;
                    temp['periodC3'] = dataIn[i].classes[3].period;
                    if(dataIn[i].classes[3].location){
                        temp['class3L'] = dataIn[i].classes[3].location
                    }
                    else{
                        temp['class3L'] = '';
                    }
                }
                else{
                    temp['class3'] = '';
                }
                
                rows.push(temp);
            }
            
        }
    }

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

    let rows = [];

  return (
    <TableContainer sx={{ maxWidth: 1200 }} onLoad={formatData(rows)} component={Paper}>
      <Table sx={{ maxWidth: 1200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Teacher Name</TableCell>
            <TableCell align="right">Period 1</TableCell>
            <TableCell align="right">Period 1 Location</TableCell>
            <TableCell align="right">Period 2</TableCell>
            <TableCell align="right">Period 2 Location</TableCell>
            <TableCell align="right">Period 3</TableCell>
            <TableCell align="right">Period 3 Location</TableCell>
            <TableCell align="right">Period 4</TableCell>
            <TableCell align="right">Period 4 Location</TableCell>
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
              {console.log(dataIn[0].classes)}
              <TableCell align="right">{period(row, 1)}</TableCell>
              <TableCell align="right">{location(row, 1)}</TableCell>
              <TableCell align="right">{period(row, 2)}</TableCell>
              <TableCell align="right">{location(row, 2)}</TableCell>
              <TableCell align="right">{period(row, 3)}</TableCell>
              <TableCell align="right">{location(row, 3)}</TableCell>
              <TableCell align="right">{period(row, 4)}</TableCell>
              <TableCell align="right">{location(row, 4)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}