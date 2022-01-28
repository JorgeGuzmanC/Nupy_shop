import React, { useState, useEffect } from "react";
import { Props } from "./Tabs.type";
import { Tabs, Tab} from "@mui/material";

import './Tabs.sass'

const defaultProps = {
   variant: 'fullWidth'
}

interface TabPanelProps {
   children?: React.ReactNode;
   index: any;
   value: any;
}

function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;

   return (
   <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      {...other}
   >
      {value === index &&  children }
   </div>
   );
}

function a11yProps(value: number, index:number) {
   return {
   className: (value == index) ? `tab-active`: `tab`
   };
}

export const TabsComponent: React.FC<Props> = (props: Props) => {
   const [value, setValue] = useState(0);
   const [windowSizeWidth, setWindowSizeWidth] = useState(0);

   useEffect (()=>{
      if (typeof window !== 'undefined') {
         // Handler to call on window resize
         const handleResize = () => {
            setWindowSizeWidth(window.innerWidth);
         }
         window.addEventListener("resize", handleResize);
         handleResize();
         // Remove event listener on cleanup
         return () => window.removeEventListener("resize", handleResize);
      }
   },[])

   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      if(!!props.setTabValidate){
         if(!props.errorForm){
               props.setTabValidate(newValue);
         }
         props.setTabValidate(0);
      }else{
         setValue(newValue);
         if (props.setTabValue)
               props.setTabValue(newValue)
               props.setValueForm(newValue);
      }
   };


return (
      <div className={"c-tabs-container "+ (props.classMore||'')}>
         <div style={{position: "relative"}}>
            <div className="c-tabs-linear"></div>
            <Tabs
            textColor="primary"
            indicatorColor="primary"
               value={props.tabValidate? props.tabValidate : value}
               onChange={handleChange}
               variant={ (windowSizeWidth < 730) ?  'fullWidth'
                  : (props.variant == 'standard')?'standard':'fullWidth'
               }
               TabIndicatorProps={{style: { height:"3px"} }}
         >
            {
               props.labels.map((index, position)=>{
                  let label = '';
                  let icon  = undefined;
                  if (index === null || index === undefined) {
                     label = '';
                  } else if (index.constructor === Object) {
                     label = index.label;
                     icon  = index.icon;
                  } else {
                     label = index;
                  }
                  return <Tab key={label} label={label} {...a11yProps(props.tabValidate? props.tabValidate : value, position)} icon={icon}/>
               })
            }
         </Tabs>
         </div>
         <TabPanel value={props.tabValidate? props.tabValidate : value} index={0}>
            {
               props.childrenOne
            }
         </TabPanel>
         <TabPanel value={props.tabValidate? props.tabValidate : value} index={1}>
            {
               props.childrenTwo
            }
         </TabPanel>
      </div>
   );
}

TabsComponent.defaultProps = defaultProps;
