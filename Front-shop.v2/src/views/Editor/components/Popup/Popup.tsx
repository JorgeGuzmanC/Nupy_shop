import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Typography from '@mui/material/Typography';

export const Popup: React.FC<any> = (props:any): JSX.Element => {
    const {title, children, openPopup, setOpenPopup} = props;

    return(
        <Dialog open={openPopup} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h4" component="div" style={{marginTop:'15px', marginBottom:'15px'}}>
                    {title}
                </Typography>
                <Box position="absolute" top={0} right={0} style={{marginRight:'15px', marginTop:'25px'}}>
                    <IconButton aria-label="delete" size="small" color="error" onClick={() =>{setOpenPopup(false)}}>
                        <CloseIcon sx={{ fontSize: 20 }}/>
                    </IconButton> 
                </Box>
            </DialogTitle>  
            <DialogContent dividers>
                <div>
                    {children}
                </div>
                
            </DialogContent>
        </Dialog>
    );

}
