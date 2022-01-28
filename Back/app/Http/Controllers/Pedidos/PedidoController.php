<?php

namespace App\Http\Controllers\Pedidos;
use App\Models\Pedidos\Pedido;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function crearPedido(Request $request){
        $pedido = new Pedido;
        $pedido->id_ticket = $request->input('id_ticket');
        $pedido->nombre_cliente = $request->input('nombre_cliente');
        $pedido->state = $request->input('state');
        $pedido->tipo = $request->input('tipo');
        $pedido->monto_total = $request->input('monto_total');
        $pedido->id_forma_pago = $request->input('id_forma_pago');
        $pedido->id_user = $request->input('id_user');

        $pedido->save();

        return response()->json([
            'status' => 200,
            'message' => 'Pedido Added Successfully',
            'productoID' => $pedido->id,
        ]);
    }

    public function getPedidos(){
        $pedidos = Pedido::all();
        if( sizeof($pedidos) != 0){
            return response()->json([
                'status' => 200,
                'pedidos' => $pedidos,
            ]); 
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No hay pedidos',
            ]);
        }
    }
}
