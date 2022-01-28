import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import * as Routes from '@constants/route-map';
import { useLocalStorage } from '@toolbox/hooks/local-storage.hook';
import { KEY_USER_DATA } from '@toolbox/constants/local-storage';
import { Login } from "@views/Login"
import { Home } from "@views/Home"
import { PrivateRoute, AuthRoute } from './PrivateRoute';

import { Reporte } from '@/views/Reporte/Reporte ';
import { Caja } from '@/views/Caja';
import { Pedidos } from '@/views/Pedidos';
import { ProductosMaestros } from '@/views/Productos/Productos';
import { Empleados } from '@/views/Empleados/Empleados';
import { Salas } from '@/views/Salas/Salas';
import { Editor } from '@/views/Editor/Editor';



const AllRoutes: React.FC = () => {

	const [dataUser] = useLocalStorage(KEY_USER_DATA, undefined);

   const moduleHome = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_HOME} component={Home} />,
   ];

   const moduleReporte = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_REPORTE} component={Reporte} />,
   ];
   const moduleCaja = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_CAJA} component={Caja} />,
   ];
   const modulePedidos = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_PEDIDOS} component={Pedidos} />,
   ];

   const moduleProductos = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_PRODUCTOS} component={ProductosMaestros} />,
   ];
   const moduleEmpleados = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_EMPLEADOS} component={Empleados} />,
   ];
   const moduleSalas = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_SALAS} component={Salas} />,
   ];
   const moduleEditor = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_EDITOR} component={Editor} />,
   ];
   

	const routes = useMemo(() => {
      return (
         <Router>
            <Switch>
               {moduleHome}
               {moduleReporte}
               {moduleCaja}
               {modulePedidos}
               {moduleProductos}
               {moduleEmpleados}
               {moduleSalas}
               {moduleEditor}
              
               <AuthRoute exact path={Routes.ROUTE_LOGIN} component={Login} />
               {<Route path='*' exact={true} component={() => {
                  return <Redirect to={Routes.ROUTE_LOGIN} />
               }} />}
            </Switch>
         </Router>
      )
	},// eslint-disable-next-line
	[JSON.stringify(dataUser)]);

	return routes;
}

export default AllRoutes;
