<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;
    public $table = "empresas";
    protected $fillable = [
        'id',
        'nombre',
        'rut',
        'formas_de_pago',
        'state',
    ];
}
