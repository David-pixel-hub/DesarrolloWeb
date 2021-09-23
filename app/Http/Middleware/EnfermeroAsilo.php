<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnfermeroAsilo
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
        if (Auth::user()->id_tipo_empleado == 1) {   //si se autentico correctamente y su rol es correcto entonces continuar
            return $next($request);
        }
        if (Auth::user()->id_tipo_empleado == 2) {
            return redirect()->route('MedicoAsilo');
        }
        if (Auth::user()->id_tipo_empleado == 3) {
            return redirect()->route('GestionsolicitudesFundacion');
        }
        if (Auth::user()->id_tipo_empleado == 4) {
            return redirect()->route('MedicoFundacion');
        }
        if (Auth::user()->id_tipo_empleado == 5) {
            return redirect()->route('LaboratorioFundacion');
        }
    }
}
