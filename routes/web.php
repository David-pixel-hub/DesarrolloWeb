<?php

use App\Http\Controllers\EnfermeroAsiloController;
use App\Http\Controllers\GestionsolicitudesFundacionController;
use App\Http\Controllers\GlobalDataController;
use App\Http\Controllers\LaboratorioFundacionController;
use App\Http\Controllers\MedicoAsiloController;
use App\Http\Controllers\MedicoFundacionController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/master-data', [GlobalDataController::class,'Maestro'])->name('Maestro')->middleware('globaldata');
Route::get('/details-data/{id}', [GlobalDataController::class,'Detalle'])->name('Detalle')->middleware('globaldata');
Route::get('/GestionSolicitudesData', [GlobalDataController::class,'GestionSolicitudesData'])->name('GestionSolicitudesData')->middleware('globaldata');
Route::get('/EnfermeroAsilo', [EnfermeroAsiloController::class,'index'])->name('EnfermeroAsilo')->middleware('EnfermeroAsilo');
Route::get('/MedicoAsilo', [MedicoAsiloController::class,'index'])->name('MedicoAsilo')->middleware('MedicoAsilo');
Route::post('/MedicoAsilo', [MedicoAsiloController::class,'store'])->name('MedicoAsilo')->middleware('MedicoAsilo');
Route::get('/GestionsolicitudesFundacion', [GestionsolicitudesFundacionController::class,'index'])->name('GestionsolicitudesFundacion')->middleware('GestionsolicitudesFundacion');
Route::post('/GestionsolicitudesFundacion', [GestionsolicitudesFundacionController::class,'store'])->name('GestionsolicitudesFundacion')->middleware('GestionsolicitudesFundacion');
Route::get('/GestionsolicitudesFundacion/cancelar/{id}', [GestionsolicitudesFundacionController::class,'cancelarcita'])->name('cancelarcita')->middleware('GestionsolicitudesFundacion');
Route::get('/GestionsolicitudesFundacion/CitasMedicasDisponibles/{id_especialidad}', [GestionsolicitudesFundacionController::class,'CitasMedicasDisponibles'])->name('CitasMedicasDisponibles')->middleware('GestionsolicitudesFundacion');

Route::get('/MedicoFundacion', [MedicoFundacionController::class,'index'])->name('MedicoFundacion')->middleware('MedicoFundacion');
Route::post('/MedicoFundacionFase2', [MedicoFundacionController::class,'storefase2'])->name('storefase2')->middleware('MedicoFundacion');
Route::post('/MedicoFundacionFase4', [MedicoFundacionController::class,'storefase4'])->name('storefase4')->middleware('MedicoFundacion');
Route::get('/MedicoFundacion/cancelar/{id}', [MedicoFundacionController::class,'cancelarcita'])->name('MedicoFundacion_cancelarcita')->middleware('MedicoFundacion');


Route::get('/LaboratorioFundacion', [LaboratorioFundacionController::class,'index'])->name('LaboratorioFundacion')->middleware('LaboratorioFundacion');
