<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LaboratorioFundacionController extends Controller
{
    public function index()
    {
        return view('LaboratorioFundacion.index');
    }
}
