import React, {  useEffect, FunctionComponent, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Backdrop, Button, CircularProgress, FormControl, Grid, IconButton, LinearProgress, MenuItem, Select, Snackbar, Stack, TableContainer, Typography } from '@mui/material';
import { saleService } from '@service/services/Sale.service';
import { doopyService } from '@service/services/Doopy.service'
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_ARRAY_MY_MENU, KEY_EMPRESA, KEY_LOCAL_STORAGE, KEY_PARMS, KEY_TIPO_ROL, KEY_TOKEN, KEY_TOOGLE_MENU, KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { Protected } from '@/components/layout/Protected';
import { FormatDouble, moneyFormat, moneyFormatInt } from '@/toolbox/helpers/money.helper'
import { useMediaQuery, useTheme } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const Reporte: FunctionComponent = (props: any) => {

return(
   <Protected>
   <div>Reporte</div>
</Protected>

)
}
