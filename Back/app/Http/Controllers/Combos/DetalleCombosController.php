<?php

namespace App\Http\Controllers\Combos;
use App\Models\Combos\DetalleCombo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DetalleCombosController extends Controller
{
    public function addComboProducto(Request $request){
        $detalle = new DetalleCombo;
        $detalle->id_producto_combo = $request->input('id_producto_combo');
        $detalle->id_opcion = $request->input('id_opcion');
        $detalle->id_producto_select = $request->input('id_producto_select');
        $detalle->cantidad = $request->input('cantidad');
        $detalle->state = $request->input('state');

        $detalle->save();

        return response()->json([
            'status' => 200,
            'message' => 'Detalle Added Successfully',
        ]);
    }

    public function getDetalle($id_opcion){
        $detalle = DetalleCombo::where('id_opcion',$id_opcion)->get();

        if($detalle){
            return response()->json([
                'status' => 200,
                'detalle' => $detalle,
            ]); 
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existe detalle de este combo',
            ]);
        }
    }

    public function getDetalleCombo($id_producto){
        $detalle = DetalleCombo::where('id_opcion',$id_producto)->get();

        if($detalle){
            return response()->json([
                'status' => 200,
                'detalle' => $detalle,
            ]); 
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existe detalle de este combo',
            ]);
        }
    }

    public function deleteDetalle($id_combo){
        $detalle = DetalleCombo::where('id_opcion', $id_combo)->get();

        if($detalle){
            $detalle->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Detalle deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Detalle not found',
            ]);
        }
    }


}
