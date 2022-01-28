<?php

namespace App\Models\Pedidos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormasDePago extends Model
{
    use HasFactory;
    protected $table = 'forma_pago';
    protected $fillable = [
        'forma',
        'state',
    ];
}
