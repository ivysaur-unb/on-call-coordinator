import { Button } from "@mui/material";
import { Stack,Box } from "@mui/material";

const VicePrincipalOnCall = function () {
  const generateOnCall = function () {
    const today = new Date();
    const options = {
      method: "POST",
      body: JSON.stringify({
        //I did it like this so the date given will be at time 0
        date: new Date(today.getFullYear(), today.getMonth(),today.getDay()),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
    };
    window.fetch("/onCall", options);
  };

  return (
    <div className="upload-courses-root">
    <Box className='box'>
        <h1>Generate On Calls for Today</h1>
        <Button variant="contained" component="label" onClick={generateOnCall}>
                Generate
                
        </Button>
   
    </Box>
</div>
  );
};

export default VicePrincipalOnCall;
