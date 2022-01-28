<?php

namespace App\Models\Combos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleCombo extends Model
{
    use HasFactory;
    protected $table = 'det_productos_combo';
    protected $fillable = [
        'id_producto_combo',
        'id_opcion',
        'id_producto_select',
        'cantidad',
        'state',
    ];
}
