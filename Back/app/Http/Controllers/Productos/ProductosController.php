<?php

namespace App\Http\Controllers\Productos;
use App\Models\Productos\Productos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductosController extends Controller
{
    public function addProducto(Request $request){
        $producto = new Productos;
        $producto->codigo_erp = $request->input('codigo_erp');
        $producto->nombre = $request->input('nombre');
        $producto->precio_standar = $request->input('precio_standar');
        $producto->precio_oferta = $request->input('precio_oferta');
        $producto->id_tipo_producto = $request->input('id_tipo_producto');
        $producto->id_empresa = $request->input('id_empresa');

        // Si el codigo_erp esta en uso:
        // $productos = Productos::where('id_empresa',$producto->id_empresa)->get();
        // foreach($productos as $valor){
        //     if($valor->codigo_erp == $producto->codigo_erp){
        //         return response()->json([
        //             'status' => 400,
        //             'error' => 'El codigo del producto ya se encuentra registrado',
        //         ]);
        //     }
        // }

        $producto->save();

        return response()->json([
            'status' => 200,
            'message' => 'Producto Added Successfully',
            'productoID' => $producto->id,
        ]);
    }

    public function getProductosEmpresa($id_empresa){
        $productos = Productos::where('id_empresa',$id_empresa)->get();
        if( sizeof($productos) != 0){
            return response()->json([
                'status' => 200,
                'productos' => $productos,
            ]); 
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No hay productos de esta empresa',
            ]);
        }
    }

    public function getProductos(Request $request){
        $productos = Productos::all();
        if($productos){
            $texto = $request->input('id_productos');

            if(!$texto){
                return response()->json([
                    'status' => 400,
                    'message' => 'No hay nada para buscar',
                ]);
            }
        
            $array = explode(',', $texto);
            $arrayProductos = [];
            $string = '';
            
            foreach($array as $valor){
                $producto = $productos->where('id',$valor);
                if(sizeof($producto) != 0){
                    array_push($arrayProductos,$producto);
                }
            }
            
            return response()->json([
                'status' => 200,
                'submodulos' => $arrayProductos,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existen productos',
            ]);
        }
    }

    public function getProducto($id){
        $producto = Productos::where('id',$id)->get();
        if( sizeof($producto) != 0){
            return response()->json([
                'status' => 200,
                'productos' => $producto,
            ]); 
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existe el producto',
            ]);
        }
    }

    public function getProductoCodigo($codigo){
        $producto = Productos::where('codigo_erp',$codigo)->get();
        if( sizeof($producto) != 0){
            return response()->json([
                'status' => 200,
                'productos' => $producto,
            ]); 
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existe el producto con ese codigo',
            ]);
        }
    }

    public function getProductosTipo($id_tipo){
        $productos = Productos::where('id_tipo_producto',$id_tipo)->get();

        if(sizeof($productos) != 0){
            return response()->json([
                'status' => 200,
                'submodulos' => $productos,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No existen productos de este tipo',
            ]);
        }
    }

    public function deleteProducto($id){
        $producto = Productos::find($id);

        if($producto){
            $producto->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Producto deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Producto not found',
            ]);
        }
    }

    public function editProducto(Request $request,$id){
        $producto = Productos::find($id);

        
        if($producto){
            if($request->codigo_erp){
                $producto->codigo_erp = $request->codigo_erp;
            }
            if($request->nombre){
                $producto->nombre = $request->nombre;
            }
            if($request->precio_standar){
                $producto->precio_standar = $request->precio_standar;
            }
            if($request->precio_oferta){
                $producto->precio_oferta = $request->precio_oferta;
            }
            if($request->id_tipo_producto){
                $producto->id_tipo_producto = $request->id_tipo_producto;
            }

            //$producto->id_empresa = $request->id_empresa;

            $producto->update();
            return response()->json([
                'status' => 200,
                'message' => 'Producto updated Successfully',
                'update' => $producto
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Producto not found',
            ]);
        }
    }


}
