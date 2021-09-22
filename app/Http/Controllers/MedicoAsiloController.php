<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MedicoAsiloController extends Controller
{
    public function index()
    {
        return view('MedicoAsilo.index');
    }
}
