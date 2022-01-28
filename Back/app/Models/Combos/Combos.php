<?php

namespace App\Models\Combos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Combos extends Model
{
    use HasFactory;
    protected $table = 'opciones_combo';
    protected $fillable = [
        'nombre',
        'cantidad',
        'id_productos_disp',
        'id_producto',
    ];
}
