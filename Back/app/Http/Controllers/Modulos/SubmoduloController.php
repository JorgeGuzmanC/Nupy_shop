<?php

namespace App\Http\Controllers\Modulos;
use App\Models\Modulos\Submodulo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SubmoduloController extends Controller
{
    public function getSubmodulo($id){
        $submodulos = Submodulo::all();
        $submodulo = $submodulos->where('id',$id);
      

        if( sizeof($submodulo) == 0 ){
            return response()->json([
                'status' => 400,
                'error' => 'No existe este submodulo',
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'submodulo' => $submodulo,
            ]);
        }

        
    }

    public function getSubmodulos(Request $request){
        $submodulos = Submodulo::all();
        
        if($submodulos){
            $texto = $request->input('submodulos');

            if(!$texto){
                return response()->json([
                    'status' => 400,
                    'message' => 'No hay nada para buscar',
                ]);
            }
        
            $array = explode(',', $texto);
            
            $arrayEncontrados = [];
            $noEncontrados = [];
            $string = '';
            $count = 0;
            foreach($array as $valor){
                $submodulo = $submodulos->where('id',$valor);
                
                //echo $submodulo;
                
                if(sizeof($submodulo) == 0){
                    array_push($noEncontrados,$valor);
                }else{
                    array_push($arrayEncontrados,$submodulo);
                }
                $count++;
            }
            
            $string = implode(',', $noEncontrados);
            
            if($string){
                return response()->json([
                    'status' => 200,
                    'submodulos' => $arrayEncontrados,
                    'NoEncontrados' => $string,
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'submodulos' => $arrayEncontrados,
                ]);
            }
            
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existen submodulos',
            ]);
        }
    }


    public function addSubmodulo(Request $request){
        $submodulo = new Submodulo;
        $submodulo->nombre = $request->input('nombre');
        $submodulo->id_productos = $request->input('id_productos');
        $submodulo->state = $request->input('state');
        $submodulo->save();

        return response()->json([
            'status' => 200,
            'message' => 'Submodulo Added Successfully',
            'submoduloID' => $submodulo->id,
        ]);
    }

    public function deleteSubmodulo($id){
        $submodulo = Submodulo::find($id);

        if($submodulo){
            $submodulo->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Submodulo deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Submodulo not found',
            ]);
        }
    
    }



    public function addProducto($id,$id_producto){
        $submodulo = Submodulo::find($id);

        if($submodulo){
            $texto = $submodulo->id_productos;

            if(!$texto){
                $submodulo->id_productos = $id_producto;
                $submodulo->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Producto added succesfully',
                ]);
            }
        
            $array = explode(',', $texto);
            
            foreach($array as $valor){
                if($valor === $id_producto){
                    return response()->json([
                        'status' => 400,
                        'message' => 'Este producto ya se encuentra registrado en el submodulo',
                    ]);
                }
            }
        
            array_push($array, $id_producto);
            $string = implode(',', $array);
            $submodulo->id_productos = $string;
            $submodulo->update();
            return response()->json([
                'status' => 200,
                'message' => 'Producto added succesfully',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Submodulo not found',
            ]);
        }

    }

    public function deleteProducto($id,$id_producto){
        $submodulo = Submodulo::find($id);

        if($submodulo){
            $texto = $submodulo->id_productos;

            if(!$texto){
                return response()->json([
                    'status' => 400,
                    'message' => 'No hay nada que borrar',
                ]);
            }
        
            $array = explode(',', $texto);
            $count = 0;
            foreach($array as $valor){
                if($valor === $id_producto){
                    unset($array[$count]);
                    $string = implode(',', $array);
                    $submodulo->id_productos = $string;
                    $submodulo->update();

                    return response()->json([
                        'status' => 200,
                        'message' => 'Producto deleted successfully',
                    ]);
                }
                $count++;
            }
            
            return response()->json([
                'status' => 400,
                'message' => 'Producto not found',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Submodulo not found',
            ]);
        }

    }

    public function deleteSubmodulos($ids){
        if($ids){
            $texto = $ids;
            echo $texto;
            if(!$texto){
                return response()->json([
                    'status' => 400,
                    'message' => 'No hay nada para buscar',
                ]);
            }
        
            $array = explode(',', $texto);
            
            foreach($array as $valor){
                $submodulo = Submodulo::find($valor);
                if($submodulo){
                    $submodulo->delete();
                }
            }
            
            return response()->json([
                'status' => 200,
                'message' => 'Submodulos deleted Successfully',
            ]);
            
            
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existen submodulos',
            ]);
        }
    }
}
