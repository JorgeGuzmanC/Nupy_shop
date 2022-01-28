<?php

namespace App\Http\Controllers\Modulos;
use App\Models\Modulos\DetalleProductos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DetalleProductosController extends Controller
{
    public function getProducto($id){
        $productos = DetalleProductos::all();
        $producto = $productos->where('id',$id);
      

        if( sizeof($producto) == 0 ){
            return response()->json([
                'status' => 400,
                'error' => 'No existe este producto',
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'submodulo' => $producto,
            ]);
        }
    }

    public function getModulos($id_submodulo){
        $allProductos = Submodulo::all();
        $productos = $allProductos->where('id_submodulo', $id_submodulo);

        if( sizeof($productos) == 0 ){
            return response()->json([
                'status' => 400,
                'error' => 'No hay productos en este submodulo',
            ]);
        }

        return response()->json([
            'status' => 200,
            'modulos' => $productos,
        ]);
    }

    public function addProducto(Request $request){
        $producto = new DetalleProductos;
        $producto->id_submodulo = $request->input('id_submodulo');
        $producto->cantidad = $request->input('cantidad');
        $producto->id_productos = $request->input('id_productos');
        
        $producto->save();

        return response()->json([
            'status' => 200,
            'message' => 'Producto Added Successfully',
            'productoID' => $producto->id,
        ]);
    }

    public function deleteProducto($id){
        $producto = DetalleProductos::find($id);

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

    public function editProducto($id){
        $producto = DetalleProductos::find($id);

        if($producto){
            if($request->cantidad){
                $producto->cantidad = $request->cantidad;
            }
            if($request->id_productos){
                $producto->id_productos = $request->id_productos;
            }
            
            $producto->update();
            return response()->json([
                'status' => 200,
                'message' => 'Producto updated Successfully',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Producto not found',
            ]);
        }
    }

    
}
