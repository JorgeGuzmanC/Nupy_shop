<?php

namespace App\Models\Modulos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modulo extends Model
{
    use HasFactory;
    protected $table = 'modulo';
    protected $fillable = [
        'nombre',
        'state',
        'id_empresa',
        'submodulos',
    ];
}
