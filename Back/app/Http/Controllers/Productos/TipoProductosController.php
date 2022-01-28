<?php

namespace App\Http\Controllers\Productos;
use App\Models\Productos\TipoProductos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TipoProductosController extends Controller
{
    public function getAll(){
        $tipos = TipoProductos::all();

        if( sizeof($tipos) == 0 ){
            return response()->json([
                'status' => 400,
                'error' => 'No existen tipos',
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'tipos' => $tipos,
            ]);
        }
    }

    public function getTipos($id_empresa){
        $tipos = TipoProductos::all();
        $tiposNo = [];
        $cont = 0;

        if(sizeof($tipos) != 0){
            foreach($tipos as $valor){
                $id_empresas = $valor->id_empresas;
                if($id_empresas){
                    $array = explode(',', $id_empresas);
                    $condicion = true;
                    foreach($array as $ids){
                        if($ids == $id_empresa){
                            $condicion = false;
                            break;
                        }
                    }
                    if($condicion){
                        array_push($tiposNo, $valor);
                    }
                }else{
                    array_push($tiposNo, $valor);
                }
                $cont++;
            }
            
            if(sizeof($tiposNo) == 0){
                return response()->json([
                    'status' => 400,
                    'message' => 'No existe la empresa o tiene todos los tipos',
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'tipos' => $tiposNo,
                ]);
            }
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Tipos not found',
            ]);
        }

    }

    public function getTipo($id){
        $tipo = TipoProductos::find($id);
      

        if( !$tipo ){
            return response()->json([
                'status' => 400,
                'error' => 'No existe este tipo',
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'tipo' => $tipo,
            ]);
        }

        
    }

    public function getTiposEmpresa($id_empresa){
        $tipos = TipoProductos::all();
        $tiposNo = [];
        $cont = 0;

        if(sizeof($tipos) != 0){
            foreach($tipos as $valor){
                $id_empresas = $valor->id_empresas;
                if($id_empresas){
                    $array = explode(',', $id_empresas);
                    foreach($array as $ids){
                        if($ids == $id_empresa){
                            array_push($tiposNo, $valor);
                        }
                    }
                }
                $cont++;
            }
            
            if(sizeof($tiposNo) == 0){
                return response()->json([
                    'status' => 400,
                    'message' => 'No existe la empresa o tiene todos los tipos',
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'tipos' => $tiposNo,
                ]);
            }
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Tipos not found',
            ]);
        }

    }

    public function addTipo(Request $request){
        $tipo = new TipoProductos;
        $tipo->tipo = $request->input('tipo');
        $tipo->id_empresas = $request->input('id_empresas');
        $tipo->save();

        return response()->json([
            'status' => 200,
            'message' => 'Tipo Added Successfully',
            'tipoID' => $tipo->id,
        ]);
    }

    public function addTipoEmpresa($id_empresa, $id){
        $tipo = TipoProductos::find($id);

        if($tipo){
            $texto = $tipo->id_empresas;

            if(!$texto){
                $tipo->id_empresas = $id_empresa;
                $tipo->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Tipo added succesfully',
                ]);
            }
        
            $array = explode(',', $texto);
            
            foreach($array as $valor){
                if($valor === $id_empresa){
                    return response()->json([
                        'status' => 400,
                        'message' => 'Esta empresa ya tiene asociado este producto',
                    ]);
                }
            }
        
            array_push($array, $id_empresa);
            $string = implode(',', $array);
            $tipo->id_empresas = $string;
            $tipo->update();
            return response()->json([
                'status' => 200,
                'message' => 'Tipo added succesfully',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Tipo not found',
            ]);
        }
    }


    public function deleteTipo($id){
        $tipo = TipoProductos::find($id);

        if($tipo){
            $tipo->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Tipo deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Tipo not found',
            ]);
        }


    }

    public function deleteTipoEmpresa($id_empresa, $id){
        $tipo = TipoProductos::find($id);

        if($tipo){
            $texto = $tipo->id_empresas;

            if(!$texto){
                return response()->json([
                    'status' => 200,
                    'message' => 'El tipo no esta asociado a esta empresa',
                ]);
            }
        
            $array = explode(',', $texto);
            $count = 0;
            foreach($array as $valor){
                if($valor === $id_empresa){
                    unset($array[$count]);
                    $string = implode(',', $array);
                    $tipo->id_empresas = $string;
                    $tipo->update();

                    return response()->json([
                        'status' => 200,
                        'message' => 'Tipo deleted successfully',
                    ]);
                }
                $count++;
            }
            
            return response()->json([
                'status' => 400,
                'message' => 'Tipo not found para esta empresa',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Tipo not found',
            ]);
        }
    }
    
}
