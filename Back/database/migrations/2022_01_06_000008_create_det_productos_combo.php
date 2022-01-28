<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class createDetProductosCombo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('det_productos_combo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_producto_combo')->constrained('productos');
            $table->foreignId('id_opcion')->constrained('opciones_combo');
            $table->integer('id_producto_select');
            $table->integer('cantidad');
            $table->string('state')->nullable();
            
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('det_productos_combo');
    }
}
