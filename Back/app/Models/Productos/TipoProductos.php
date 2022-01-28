<?php

namespace App\Models\Productos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoProductos extends Model
{
    use HasFactory;
    protected $table = 'tipo_producto';
    protected $fillable = [
        'tipo',
        'id_empresas',
    ];
}
