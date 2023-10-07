import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"

export const NotFound = () => {
    const nav = useNavigate();
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            gap: '30px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1 style={{margin: '0'}}>404</h1>
            <div>Page Not found</div>
            <Button variant="contained" color="primary" onClick={()=> nav('/')}>Go Back</Button>
        </div>
    )
}