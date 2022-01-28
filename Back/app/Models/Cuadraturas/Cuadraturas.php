<?php

namespace App\Models\Cuadraturas;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuadraturas extends Model
{
    use HasFactory;
    protected $table = 'cuadraturas';
    protected $fillable = [
        'responsable',
        'fecha_apertura',
        'monto_inicial',
        'fecha_cierre',
        'monto_final',
        'monto_salida',
        'id_user',
    ];
}
