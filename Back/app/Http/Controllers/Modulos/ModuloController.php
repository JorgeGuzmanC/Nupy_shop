<?php

namespace App\Http\Controllers\Modulos;
use App\Models\Modulos\Modulo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ModuloController extends Controller
{
    public function getModulo($id){
        $modulos = Modulo::all();
        $modulo = $modulos->where('id', $id);

        if( sizeof($modulo) == 0 ){
            return response()->json([
                'status' => 400,
                'error' => 'No existe el modulo',
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'modulos' => $modulo,
            ]);
        }
    }

    public function getModulos($id_empresa){
        $modulos = Modulo::all();
        $modulos_empresa = $modulos->where('id_empresa', $id_empresa);

        if( sizeof($modulos_empresa) == 0 ){
            return response()->json([
                'status' => 400,
                'error' => 'No hay modulos de esta empresa',
            ]);
        }

        return response()->json([
            'status' => 200,
            'modulos' => $modulos_empresa,
        ]);
    }


    public function addModulo(Request $request){
        $modulo = new Modulo;

        $modulo->nombre = $request->input('nombre');
        $modulo->state = $request->input('state');
        $modulo->id_empresa = $request->input('id_empresa');
        $modulo->submodulos = $request->input('submodulos');
        $modulo->save();

        return response()->json([
            'status' => 200,
            'message' => 'Modulo Added Successfully',
        ]);


    }

    public function deleteModulo($id){
        $modulo = Modulo::find($id);
        $modulo->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Modulo deleted Successfully',
        ]);

    }

    public function addSubmodulo($id,$id_submodulo){
        $modulo = Modulo::find($id);

        if($modulo){
            $texto = $modulo->submodulos;

            if(!$texto){
                $modulo->submodulos = $id_submodulo;
                $modulo->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Submodulo added succesfully',
                ]);
            }
        
            $array = explode(',', $texto);
            
            foreach($array as $valor){
                if($valor === $id_submodulo){
                    return response()->json([
                        'status' => 400,
                        'message' => 'Este submodulo ya se encuentra registrado en el modulo',
                    ]);
                }
            }
        
            array_push($array, $id_submodulo);
            $string = implode(',', $array);
            $modulo->submodulos = $string;
            $modulo->update();
            return response()->json([
                'status' => 200,
                'message' => 'Submodulo added succesfully',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Modulo not found',
            ]);
        }

    }


    public function deleteSubmodulo($id,$id_submodulo){
        $modulo = Modulo::find($id);

        if($modulo){
            $texto = $modulo->submodulos;

            if(!$texto){
                return response()->json([
                    'status' => 400,
                    'message' => 'No hay nada que borrar',
                ]);
            }
        
            $array = explode(',', $texto);
            
            $count = 0;
            foreach($array as $valor){
                if($valor === $id_submodulo){
                    unset($array[$count]);
                    $string = implode(',', $array);
                    $modulo->submodulos = $string;
                    $modulo->update();
                    return response()->json([
                        'status' => 200,
                        'message' => 'Submodulo deleted successfully',
                    ]);
                }
                $count++;
            }
            

            return response()->json([
                'status' => 200,
                'message' => 'Submodulo not found',
            ]);


        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Modulo not found',
            ]);
        }

    }
}
