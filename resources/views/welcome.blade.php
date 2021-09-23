<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Page Title -->
    <title>Nueva Vida</title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="/images/plantilla/logo/favicon.png" type="image/x-icon">

    <!-- CSS Files -->
    <link rel="stylesheet" href="{{asset('css/plantilla/animate-3.7.0.css')}}">
    <link rel="stylesheet" href="{{asset('css/plantilla/font-awesome-4.7.0.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/plantilla/bootstrap-4.1.3.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/plantilla/owl-carousel.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/plantilla/jquery.datetimepicker.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/plantilla/linearicons.css')}}">
    <link rel="stylesheet" href="{{asset('css/plantilla/style.css')}}">


</head>
<body>
    <!-- Preloader Starts -->
    <div class="preloader">
        <div class="spinner"></div>
    </div>
    <!-- Preloader End -->

    <!-- Header Area Starts -->
    <header class="header-area">
        <div class="header-top">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9 d-md-flex">
                        <h6 class="mr-3"><span class="mr-2"><i class="fa fa-mobile"></i></span> LLamanos 12345678</h6>
                        <h6 class="mr-3"><span class="mr-2"><i class="fa fa-envelope-o"></i></span> nuevavida@gmail.com</h6>
                        <h6><span class="mr-2"><i class="fa fa-map-marker"></i></span> Coatepeque zona 0</h6>
                    </div>
                    <div class="col-lg-3">
                        <div class="social-links">
                            <ul>
                                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                                <li><a href="#"><i class="fa fa-vimeo"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="header" id="home">
            <div class="container">
                <div class="row align-items-center justify-content-between d-flex">
                <div id="logo">
                    <a href="#"><img src="/images/plantilla/logo/logo1.png" alt="" title="" /></a>
                </div>
                <nav id="nav-menu-container">
                    <ul class="nav-menu">
                        <li class="menu-active"><a href="#">Inicio</a></li>
                        <li><a href="#">Departamentos</a></li>
                        <li><a href="#">Doctores</a></li>

                        <li><a href="#">Contactenos</a></li>
                        @auth
                        <li><a href="{{ route(Auth::user()->role) }}">Mi cuenta</a></li>
                        @else
                        <li><a href="{{ route('login') }}">Iniciar Sesion</a></li>
                        @endauth
                    </ul>
                </nav><!-- #nav-menu-container -->
                </div>
            </div>
        </div>
    </header>
    <!-- Header Area End -->

    <!-- Banner Area Starts -->
    <section class="banner-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-5">
                    <h4>Asilo de ancianos</h4>
                    <h1>Amor de casa y cuidado de expertos</h1>
                    <p>un espacio y un concepto único en Guatemala creado para cuidar, atender y dar calidad de vida, salud, bienestar, así como felicidad y amor a nuestros abuelos y maestros de vida.</p>
{{--                    <a href="" class="template-btn mt-3">LEER MAS</a>--}}
                </div>
            </div>
        </div>
    </section>
    <!-- Banner Area End -->

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <!-- Welcome Area Starts -->
    <section class="welcome-area section-padding3">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 align-self-center">
                    <div class="welcome-img">
                        <img src="images/plantilla/welcome.png" alt="">
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="welcome-text mt-5 mt-lg-0">
                        <h2>Bienvenido a casa</h2>
                        <p class="pt-3">Nueva Vida es una Institución de Asistencia Privada sin fines de lucro que proporciona atención a personas Adultas Mayores mediante el servicio de Casa Hogar </p>
                        <p>Proporcionamos los requerimientos de subsistencia como hospedaje, alimentación, vestido, asistencia médica, fisioterapia, actividades ocupacionales y recreativas.</p>
                        <p>Recibimos donaciones económicas y en especie de instituciones y personas que desean contribuir al bienestar de nuestros beneficiados.</p>
                        <a href="#" class="template-btn mt-3">Leer mas</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Welcome Area End -->


    <!-- Specialist Area Starts -->
    <section class="specialist-area section-padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="section-top text-center">
                        <h2>Nuestros especialistas</h2>
                        <p>Contamos con el apoyo de una fundacion la cual nos proporciona un personal que ha sido seleccionado a través de exhaustivos procesos, cuyas referencias han sido previamente contrastadas y sus habilidades, verificadas a lo largo de su trayectoria.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3 col-sm-6">
                    <div class="single-doctor mb-4 mb-lg-0">
                        <div class="doctor-img">
                            <img src="images/plantilla/doctor1.jpg" alt="" class="img-fluid">
                        </div>
                        <div class="content-area">
                            <div class="doctor-name text-center">
                                <h3>Carlos Alberto</h3>
                                <h6>Equipo Nueva Vida</h6>
                            </div>
                            <div class="doctor-text text-center">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <ul class="doctor-icon">
                                    <li><a href="#"><i class="fa fa-facebook"></i><a></li>
                                    <li><a href="#"><i class="fa fa-twitter"></i><a></li>
                                    <li><a href="#"><i class="fa fa-linkedin"></i><a></li>
                                    <li><a href="#"><i class="fa fa-pinterest"></i><a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6">
                    <div class="single-doctor mb-4 mb-lg-0">
                        <div class="doctor-img">
                            <img src="images/plantilla/doctor2.jpg" alt="" class="img-fluid">
                        </div>
                        <div class="content-area">
                            <div class="doctor-name text-center">
                                <h3>Gustavo Quintero</h3>
                                <h6>Equipo Nueva Vida</h6>
                            </div>
                            <div class="doctor-text text-center">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <ul class="doctor-icon">
                                    <li><a href="#"><i class="fa fa-facebook"></i><a></li>
                                    <li><a href="#"><i class="fa fa-twitter"></i><a></li>
                                    <li><a href="#"><i class="fa fa-linkedin"></i><a></li>
                                    <li><a href="#"><i class="fa fa-pinterest"></i><a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6">
                    <div class="single-doctor mb-4 mb-sm-0">
                        <div class="doctor-img">
                            <img src="images/plantilla/doctor3.jpg" alt="" class="img-fluid">
                        </div>
                        <div class="content-area">
                            <div class="doctor-name text-center">
                                <h3>Cecilia Guzman</h3>
                                <h6>Equipo Nueva Vida</h6>
                            </div>
                            <div class="doctor-text text-center">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <ul class="doctor-icon">
                                    <li><a href="#"><i class="fa fa-facebook"></i><a></li>
                                    <li><a href="#"><i class="fa fa-twitter"></i><a></li>
                                    <li><a href="#"><i class="fa fa-linkedin"></i><a></li>
                                    <li><a href="#"><i class="fa fa-pinterest"></i><a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6">
                    <div class="single-doctor">
                        <div class="doctor-img">
                            <img src="images/plantilla/doctor4.jpg" alt="" class="img-fluid">
                        </div>
                        <div class="content-area">
                            <div class="doctor-name text-center">
                                <h3>Ariel Garrido</h3>
                                <h6>Equipo Nueva Vida</h6>
                            </div>
                            <div class="doctor-text text-center">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <ul class="doctor-icon">
                                    <li><a href="#"><i class="fa fa-facebook"></i><a></li>
                                    <li><a href="#"><i class="fa fa-twitter"></i><a></li>
                                    <li><a href="#"><i class="fa fa-linkedin"></i><a></li>
                                    <li><a href="#"><i class="fa fa-pinterest"></i><a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Specialist Area Starts -->

    <!-- Hotline Area Starts -->
    <section class="hotline-area text-center section-padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h2>CONTACTANOS</h2>
                    <span>1234 5678</span>
                    <p class="pt-3">Proporcionamos asistencia 24/7. contactanos para mas informacion <br>Asilo de Ancianos Nueva Vida</p>
                </div>
            </div>
        </div>
    </section>
    <!-- Hotline Area End -->


    <!-- Javascript -->


    <script src="{{asset('js/plantilla/jquery-2.2.4.min.js')}}"></script>
	<script src="{{asset('js/plantilla/bootstrap-4.1.3.min.js')}}"></script>
    <script src="{{asset('js/plantilla/wow.min.js')}}"></script>
    <script src="{{asset('js/plantilla/owl-carousel.min.js')}}"></script>
    <script src="{{asset('js/plantilla/jquery.datetimepicker.full.min.js')}}"></script>
    <script src="{{asset('js/plantilla/jquery.nice-select.min.js')}}"></script>
    <script src="{{asset('js/plantilla/superfish.min.js')}}"></script>
    <script src="{{asset('js/plantilla/main.js')}}"></script>

</body>
</html>
