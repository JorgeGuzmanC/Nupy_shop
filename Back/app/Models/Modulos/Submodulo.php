<?php

namespace App\Models\Modulos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submodulo extends Model
{
    use HasFactory;
    protected $table = 'submodulo';
    protected $fillable = [
        'nombre',
        'id_productos',
        'state',
    ];
}