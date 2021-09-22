<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LaboratorioFundacion
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
//    public function handle(Request $request, Closure $next)
//    {
//        return $next($request);
//    }
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {                           //sino esta autenticado redirigir al login
            return redirect()->route('login');
        }
        if (Auth::user()->role == 'LaboratorioFundacion') {//si se autentico correctamente y su rol es correcto entonces continuar
            return $next($request);
        }
        if (Auth::user()->role == 'EnfermeroAsilo') {
            return redirect()->route('EnfermeroAsilo');
        }
        if (Auth::user()->role == 'MedicoAsilo') {
            return redirect()->route('MedicoAsilo');
        }
        if (Auth::user()->role == 'GestionsolicitudesFundacion') {
            return redirect()->route('GestionsolicitudesFundacion');
        }
        if (Auth::user()->role == 'MedicoFundacion') {
            return redirect()->route('MedicoFundacion');
        }
    }
}
