<?php

namespace App\Http\Controllers\Cuadraturas;
use App\Models\Cuadraturas\Cuadraturas;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CuadraturasController extends Controller
{
    public function abrirCuadratura(Request $request){
        $date = date('Y-m-d H:i:s');
        $cuadratura = new Cuadraturas;
        $cuadratura->responsable = $request->input('responsable');
        $cuadratura->fecha_apertura = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date)
        ->format('d-m-Y');
        $cuadratura->monto_inicial = $request->input('monto_inicial');
        // $cuadratura->fecha_cierre = $request->input('fecha_cierre');
        // $cuadratura->monto_final = $request->input('monto_final');
        // $cuadratura->monto_salida = $request->input('monto_salida');
        $cuadratura->id_user = $request->input('id_user');

        $cuadratura->save();

        return response()->json([
            'status' => 200,
            'message' => 'Cuadratura creada con exito',
        ]);
    }

    public function getCuadratura($id){
        $cuadratura = Cuadraturas::find($id);

        if($cuadratura){
            return response()->json([
                'status' => 200,
                'cuadratura' => $cuadratura,
            ]); 
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existe una cuadratura con ese id',
            ]);
        }
    }

    public function getActualCuadratura(){
        $cuadratura = Cuadraturas::all()->last();

        if($cuadratura){
            if($cuadratura->fecha_cierre){
                return response()->json([
                    'status' => 400,
                    'message' => 'No existen cuadraturas abiertas',
                ]); 
            }
            return response()->json([
                'status' => 200,
                'cuadratura' => $cuadratura,
            ]); 
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existen cuadraturas',
            ]);
        }
    }

    public function getUltimaCuadratura(){
        $cuadratura = Cuadraturas::all()->last();

        if($cuadratura){
            if($cuadratura->fecha_cierre){
                return response()->json([
                    'status' => 200,
                    'cuadratura' => $cuadratura,
                ]);
            }else{
                if($cuadratura->id == 1){
                    return response()->json([
                        'status' => 400,
                        'message' => 'no hay cuadraturas cerradas',
                    ]); 
                }
                $id = $cuadratura->id - 1;
                $penultima = Cuadraturas::find($id);
                return response()->json([
                    'status' => 200,
                    'cuadratura' => $penultima,
                ]); 
            }
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existen cuadraturas',
            ]);
        }
    }

    public function cerrarCuadratura(Request $request){
        $cuadratura = Cuadraturas::all()->last();
        
        if($cuadratura){
            $date = date('Y-m-d H:i:s');
            $cuadratura->fecha_cierre = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('d-m-Y');
            
            $cuadratura->monto_final = $request->monto_final;
            
            $cuadratura->monto_salida = $request->monto_salida;
            
            $cuadratura->update();
            return response()->json([
                'status' => 200,
                'message' => 'Producto updated Successfully',
                'update' => $cuadratura
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Producto not found',
            ]);
        }
    }

    public function getCuadraturaFecha($fecha){
        $cuadraturas = Cuadraturas::all();
        $array = [];
        if( sizeof($cuadraturas ) != 0 ){
            foreach($cuadraturas as $valor){
                if($valor->fecha_apertura == $fecha && $valor->fecha_cierre){
                    array_push($array,$valor);
                }
            }

            if( sizeof($array) != 0 ){
                return response()->json([
                    'status' => 200,
                    'cuadraturas' => $array,
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'No existen cuadraturas de esta fecha',
                ]);
            }
             
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existen cuadraturas',
            ]);
        }
    }
}
