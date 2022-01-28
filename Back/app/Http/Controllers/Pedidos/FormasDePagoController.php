<?php

namespace App\Http\Controllers\Pedidos;
use App\Models\Pedidos\FormasDePago;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FormasDePagoController extends Controller
{
    public function agregarForma(Request $request){
        $forma = new FormasDePago;
        $forma->forma = $request->input('forma');
        $forma->state = $request->input('state');
        $forma->save();

        return response()->json([
            'status' => 200,
            'message' => 'Forma Added Successfully',
            'productoID' => $forma->id,
        ]);
    }

    public function getFormas(){
        $formas = FormasDePago::all();
        if( sizeof($formas) != 0){
            return response()->json([
                'status' => 200,
                'formas' => $formas,
            ]); 
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existen formas de pago',
            ]);
        }
    }

    public function getForma($id){
        $forma = FormasDePago::where('id',$id)->get();
        if($forma){
            return response()->json([
                'status' => 200,
                'forma' => $forma,
            ]); 
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existen formas de pago',
            ]);
        }
    }
}
