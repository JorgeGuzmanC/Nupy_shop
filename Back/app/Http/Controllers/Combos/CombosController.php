<?php

namespace App\Http\Controllers\Combos;
use App\Models\Combos\Combos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CombosController extends Controller
{
    public function addCombo(Request $request){
        $combo = new Combos;
        $combo->nombre = $request->input('nombre');
        $combo->cantidad = $request->input('cantidad');
        $combo->id_productos_disp = $request->input('id_productos_disp');
        $combo->id_producto = $request->input('id_producto');

        $combo->save();

        return response()->json([
            'status' => 200,
            'message' => 'Combo Added Successfully',
            'comboID' => $combo->id,
        ]);
    }

    public function getCombos(){
        $combos = Combos::all();

        if( sizeof($combos) != 0){
            return response()->json([
                'status' => 200,
                'combos' => $combos,
            ]); 
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No hay combos',
            ]);
        }
    }

    public function getCombo($id){
        $combo = Combos::find($id);

        if($combo){
            return response()->json([
                'status' => 200,
                'combo' => $combo,
            ]); 
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existe un combo con este id',
            ]);
        }
    }


    public function deleteCombo($id){
        $combo = Combos::find($id);

        if($combo){
            $combo->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Combo deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Combo not found',
            ]);
        }
    }


    public function editCombo(Request $request,$id){
        $combo = Combos::find($id);
        
        if($combo){
            if($request->nombre){
                $combo->nombre = $request->nombre;
            }
            if($request->cantidad){
                $combo->cantidad = $request->cantidad;
            }
            if($request->id_productos_disp){
                $combo->id_productos_disp = $request->id_productos_disp;
            }
            
            $combo->update();
            return response()->json([
                'status' => 200,
                'message' => 'Combo updated Successfully',
                'update' => $combo
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Combo not found',
            ]);
        }
    }

}
