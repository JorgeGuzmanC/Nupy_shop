<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmpresaController;

use App\Http\Controllers\Modulos\ModuloController;
use App\Http\Controllers\Modulos\SubmoduloController;
use App\Http\Controllers\Modulos\DetalleProductosController;

use App\Http\Controllers\Productos\TipoProductosController;
use App\Http\Controllers\Productos\ProductosController;

use App\Http\Controllers\Combos\CombosController;
use App\Http\Controllers\Combos\DetalleCombosController;

use App\Http\Controllers\Cuadraturas\CuadraturasController;

use App\Http\Controllers\Pedidos\DetalleTicketController;
use App\Http\Controllers\Pedidos\FormasDePagoController;
use App\Http\Controllers\Pedidos\PedidoController;
use App\Http\Controllers\Pedidos\TicketController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/


Route::post('registro_empresa',[EmpresaController::class,'registrar']);


//Rutas para Login
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router){
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::post('register', [AuthController::class, 'register']);
});

//Rutas para CRUD de Modulos
Route::group([
    'middleware' => 'api',
    'prefix' => 'crudModulos'
], function ($router){
    //modulo
    Route::post('add_modulo', [ModuloController::class, 'addModulo']);
    Route::get('get_modulo/{id}', [ModuloController::class, 'getModulo']);
    Route::delete('delete_modulo/{id}',[ModuloController::class, 'deleteModulo']);
    //agregar submodulo a modulo (se hace cuando se quiere agregar un submodulo al txt de modulo)
    Route::put('add_sub/{id_modulo}/{id_submodulo}',[ModuloController::class, 'addSubmodulo']);
    //delete submodulo de modulo
    Route::put('delete_sub/{id_modulo}/{id_submodulo}',[ModuloController::class, 'deleteSubmodulo']);
    //submodulo
    Route::post('add_submodulo', [SubmoduloController::class, 'addSubmodulo']);
    Route::get('get_submodulo/{id}', [SubmoduloController::class, 'getSubmodulo']);
    Route::delete('delete_submodulo/{id}',[SubmoduloController::class, 'deleteSubmodulo']);
    Route::delete('delete_submodulos/{ids}',[SubmoduloController::class, 'deleteSubmodulos']);
    //agregar producto a submodulo
    Route::put('add_prod/{id_submodulo}/{id_producto}',[SubmoduloController::class, 'addProducto']);
    //delete producto de submodulo
    Route::put('delete_prod/{id_submodulo}/{id_producto}',[SubmoduloController::class, 'deleteProducto']);
    //productos
    Route::post('add_producto', [DetalleProductosController::class, 'addProducto']);
    Route::get('get_producto/{id}', [DetalleProductosController::class, 'getProducto']);
    Route::delete('delete_producto/{id}',[DetalleProductosController::class, 'deleteProducto']);
    Route::put('edit_producto/{id}',[DetalleProductosController::class, 'editProducto']);
});

//Rutas para mostrar los modulos
Route::group([
    'middleware' => 'api',
    'prefix' => 'showModulos'
], function ($router){
    Route::get('get_modulos/{id_empresa}', [ModuloController::class, 'getModulos']);
    // Pasar txt como param
    Route::post('get_submodulos', [SubmoduloController::class, 'getSubmodulos']);
    Route::get('get_productos/{id_submodulo}', [DetalleProductosController::class, 'getProductos']);
});

//Rutas para productos
Route::group([
    'middleware' => 'api',
    'prefix' => 'productos'
], function ($router){
    // Tipo producto
    Route::get('get_all_tipos', [TipoProductosController::class, 'getAll']); //todos los tipos
    Route::get('get_tipos/{id_empresa}', [TipoProductosController::class, 'getTipos']); //tipos no agregados a empresa
    Route::get('get_tipo/{id}', [TipoProductosController::class, 'getTipo']); 
    Route::get('get_tipoxempresa/{id_empresa}', [TipoProductosController::class, 'getTiposEmpresa']); //tipos agregados a empresa

    Route::post('add_tipo', [TipoProductosController::class, 'addTipo']); //tipo global
    Route::post('add_tipoE/{id_empresa}/{id}', [TipoProductosController::class, 'addTipoEmpresa']);//tipo a empresa

    Route::delete('delete_tipo/{id}', [TipoProductosController::class, 'deleteTipo']); //tipo global
    Route::delete('delete_tipoE/{id_empresa}/{id}', [TipoProductosController::class, 'deleteTipoEmpresa']);//tipo a empresa

    //productos
    Route::post('add_producto', [ProductosController::class, 'addProducto']); 
    
    Route::get('get_productosE/{id_empresa}', [ProductosController::class, 'getProductosEmpresa']); //get por empresa
    Route::post('get_productos', [ProductosController::class, 'getProductos']); //get por array de ids (post)
    Route::get('get_producto/{id}', [ProductosController::class, 'getProducto']); //get por id
    Route::get('get_producto_codigo/{codigo}', [ProductosController::class, 'getProductoCodigo']);//get por codigo
    Route::get('get_productos_tipo/{id_tipo}', [ProductosController::class, 'getProductosTipo']);//get por tipo
    
    
    Route::delete('delete_producto/{id}', [ProductosController::class, 'deleteProducto']);
    Route::put('update_producto/{id}', [ProductosController::class, 'editProducto']); //pasar como raw

});



//rutas para combos

Route::group([
    'middleware' => 'api',
    'prefix' => 'combos'
], function ($router){
    //opciones combo (combinar con productos)
    Route::post('add_combo', [CombosController::class, 'addCombo']); 
    Route::get('get_combos', [CombosController::class, 'getCombos']);
    Route::get('get_combo/{id}', [CombosController::class, 'getCombo']);
    Route::delete('delete_combo/{id}', [CombosController::class, 'deleteCombo']);
    Route::put('edit_combo/{id}', [CombosController::class, 'editCombo']);
    
    //detalle productos de combo

    Route::post('add_combo_producto', [DetalleCombosController::class, 'addComboProducto']); 
    Route::get('get_detalle/{id_opcion}', [DetalleCombosController::class, 'getDetalle']);
    Route::get('get_detalle_combo/{id_producto}', [DetalleCombosController::class, 'getDetalleCombo']);
    Route::delete('delete_detalle/{id_combo}', [DetalleCombosController::class, 'deleteDetalle']);

});

//Rutas para cuadraturas

Route::group([
    'middleware' => 'api',
    'prefix' => 'cuadraturas'
], function ($router){
    Route::post('abrir_cuadratura', [CuadraturasController::class, 'abrirCuadratura']); 
    Route::get('get_cuadratura/{id}', [CuadraturasController::class, 'getCuadratura']);
    Route::get('get_cuadratura_actual', [CuadraturasController::class, 'getActualCuadratura']); //(abierta)
    Route::get('get_cuadratura_ultima', [CuadraturasController::class, 'getUltimaCuadratura']); //(cerrada)
    Route::get('get_cuadratura_fecha/{fecha}', [CuadraturasController::class, 'getCuadraturaFecha']); //por fecha de creacion
    //Route::get('eliminar_cuadratura_actual', [CuadraturasController::class, 'eliminarActualCuadratura']); //(abierta)
    Route::put('cerrar_cuadratura', [CuadraturasController::class, 'cerrarCuadratura']);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Rutas para pedido

Route::group([
    'middleware' => 'api',
    'prefix' => 'pedido'
], function ($router){
    Route::post('agregar_forma', [FormasDePagoController::class, 'agregarForma']);
    Route::get('get_formas', [FormasDePagoController::class, 'getFormas']);
    Route::get('get_forma/{id}', [FormasDePagoController::class, 'getForma']); //puede cambiarse por un array de formas

    
    Route::post('crear_pedido', [PedidoController::class, 'crearPedido']);
    Route::get('get_pedidos', [PedidoController::class, 'getPedidos']);
    Route::get('get_pedido/{id}', [PedidoController::class, 'getPedido']);
    Route::get('get_pedido_state/{state}/{id}', [PedidoController::class, 'getPedidoState']); //state 0 espera 1 terminado
    Route::put('editar_pedido/{id}', [PedidoController::class, 'editPedido']);
    Route::delete('delete_pedido/{id}', [PedidoController::class, 'deletePedido']);
});

//Rutas para ticket y detalle

Route::group([
    'middleware' => 'api',
    'prefix' => 'ticket'
], function ($router){
    Route::post('crear_ticket', [TicketController::class, 'crearTicket']);
    Route::get('get_ticket/{id}', [PedidoController::class, 'getTicket']);
    Route::delete('delete_ticket/{id}', [PedidoController::class, 'deleteTicket']);
    //generar ticket: crear, ver, editar, eliminar. //estado 1espera, 2terminado

    Route::post('crear_detalle', [TicketController::class, 'crearDetalle']);
    Route::get('get_detalle/{id}', [PedidoController::class, 'getDetalle']);
    Route::put('editar_detalle/{id}', [PedidoController::class, 'editDetalle']);
    Route::delete('delete_detalle/{id}', [PedidoController::class, 'deleteDetalle']);

    //detalles: ver, crear,editar(agregar o eliminar productos o cantidad),eliminar. //que la cantidad sea array igual que los productos
    //al agregar productos al pedido hacer 2 arrays y agregar en la misma posicion el id y la cantidad

});


//Rutas para ventas 
//REPORTE


Route::group([
    'middleware' => 'api',
    'prefix' => 'ventas'
], function ($router){
    //ventas: agregar, ver, editar, eliminar.
    
});


//Rutas para salas

Route::group([
    'middleware' => 'api',
    'prefix' => 'salas'
], function ($router){

    //salas: crear salas, buscador de salas (fecha,id,nombre), editar por id
    //salas: nombre, numero_mesas

});


//HACER CREACION, MIGRACION DE LAS MESAS Y RUTAS
//HACER FILTROS PARA BUSQUEDA (id,tipo,codigo...)
//HACER MIGRATE REFRESH 
//crear rol?
//cambiar los registrar con validator