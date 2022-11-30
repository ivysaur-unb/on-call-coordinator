import { Button } from '@mui/material';
import { Stack, Box } from '@mui/material';
import React from 'react';
const VicePrincipalOnCall = function () {
    const [displayElement, setDisplayElement] = React.useState([]);
    const generateOnCall = function () {
        setDisplayElement([]);
        var today = new Date();
        today = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
        const options = {
            method: 'POST',
            body: JSON.stringify({
                //I did it like this so the date given will be at time 0
                date: today,
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: sessionStorage.getItem('token'),
            },
        };
        window
            .fetch('/onCall', options)
            .then((res) => res.json())
            .then((data) => {
                let disp = [];
                for (let x of data) {
                    if (x.class != null) {
                        let str = `course code: ${x.class.courseCode}, period: ${x.period}`;

                        if (x.location != null) {
                            str += `, location: ${x.location}`;
                        }
                        str += ` needs to be covered.`;
                        disp.push(<p key={x.id}> {str} </p>);
                    }
                }

                setDisplayElement(disp);
            });
    };

    return (
        <div className="upload-courses-root">
            <Box className="box">
                <h1>Generate On Calls for Today</h1>
                <Button
                    variant="contained"
                    component="label"
                    onClick={generateOnCall}
                >
                    Generate
                </Button>
                {displayElement}
            </Box>
        </div>
    );
};

export default VicePrincipalOnCall;
