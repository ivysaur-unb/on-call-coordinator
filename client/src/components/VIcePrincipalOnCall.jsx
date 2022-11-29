import { Button } from "@mui/material";
import { Stack } from "@mui/material";
const VicePrincipalOnCall = function () {

    const generateOnCall = function () {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                date: new Date()
            }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': sessionStorage.getItem('token')
            }
        }
        window.fetch('/onCall',options);
    }

    return (
        <Stack >
            <Button onClick={generateOnCall} >Get On Call </Button>
        </Stack>
    )
}

export default VicePrincipalOnCall;