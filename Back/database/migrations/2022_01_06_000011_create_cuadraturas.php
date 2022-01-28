<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class createCuadraturas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cuadraturas', function (Blueprint $table) {
            $table->id();
            $table->string('responsable');
            $table->string('fecha_apertura');
            $table->integer('monto_inicial');
            $table->string('fecha_cierre')->nullable();;
            $table->integer('monto_final')->nullable();
            $table->integer('monto_salida')->nullable();
            $table->foreignId('id_user')->constrained('usuarios');
            
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('NULL ON UPDATE CURRENT_TIMESTAMP'))->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cuadraturas');
    }
}
