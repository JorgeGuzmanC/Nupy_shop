<?php

namespace App\Models\Modulos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleProductos extends Model
{
    use HasFactory;
    protected $table = 'det_productos_sub';
    protected $fillable = [
        'id_submodulo',
        'cantidad',
        'id_productos',
    ];
}
