<?php

namespace App\Models\Productos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    use HasFactory;
    protected $table = 'productos';
    protected $fillable = [
        'codigo_erp',
        'nombre',
        'precio_standar',
        'precio_oferta',
        'id_tipo_producto',
        'id_empresa',
    ];
}
