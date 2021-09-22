<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GestionsolicitudesFundacionController extends Controller
{
    public function index()
    {
        return view('GestionsolicitudesFundacion.index');
    }
}
