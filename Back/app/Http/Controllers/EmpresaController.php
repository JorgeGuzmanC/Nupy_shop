<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;

class EmpresaController extends Controller
{
    // public function registrar(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'nombre' => 'required|string',
    //         'rut' => 'required|string|max:10|unique:usuarios',
    //         'usuario' => 'required|string',
    //         'email' => 'required|string|email|max:100',
    //         'password' => 'required|string',
    //         'id_empresa' => 'required',
    //         'rol' => 'required',
    //     ]);

        
    //     if($validator->fails()){
    //         return response()->json($validator->errors()->toJson(),400);
    //     }

    //     $empresa = Empresa::create(array_merge(
    //         $validator->validate(),
    //     ));

    //     return response()->json([
    //         'message' => 'Empresa registrado exitosamente',
    //         'empresa' => $empresa
    //     ], 201);      
    // }

    public function registrar(Request $request){
        $existe = Empresa::find($request->input('id'));
        if($existe){
            return response()->json([
                'status' => 400,
                'message' => 'La empresa ya se encuentra registrada',
            ]);
        }else{
            $empresa = new Empresa;
            $empresa->id = $request->input('id');
            $empresa->name = $request->input('nombre');
            $empresa->rut = $request->input('rut');
            $empresa->formas_de_pago = $request->input('formas_de_pago');
            $empresa->state = $request->input('state');
            $empresa->save();
    
            return response()->json([
                'status' => 200,
                'message' => 'Empresa Added Successfully',
                'empresa' => $empresa
            ]);
        }
    } 
}
