<?php

namespace App\Models\Pedidos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;
    protected $table = 'pedido';
    protected $fillable = [
        'id_ticket',
        'nombre_cliente',
        'state',
        'tipo',
        'monto_total',
        'id_forma_pago',
        'id_user',
    ];
}
