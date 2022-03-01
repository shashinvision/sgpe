<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConvenioController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UsuariosController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Solo el Login es publico, y las 2 siguientes requieren de authentication.
Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'
], function () {
    Route::post(
        'login',
        'AuthController@login'
    );

    Route::group([
        'middleware' => 'auth:api' // La ruta en el front debe pasar por el middleware => http://localhost:8888/api/auth/...
    ], function () {
        Route::post('signup', 'AuthController@signUp');
        Route::get('logout', 'AuthController@logout');
        Route::get(
            'user',
            'AuthController@user'
        );
        // Convenios
        Route::get(
            '/convenios/{idCompanys}',
            [ConvenioController::class, 'index']
        );
        Route::post(
            '/convenio',
            [ConvenioController::class, 'store']
        );
        Route::post(
            '/convenio/edit/{id}',
            [ConvenioController::class, 'update']
        );
        Route::post(
            '/convenio/delete/{id}',
            [ConvenioController::class, 'destroy']
        );
        Route::post(
            '/convenio/estado/{id}',
            [ConvenioController::class, 'activaDesactiva']
        );

        // Companys
        Route::get(
            '/companys',
            [CompanyController::class, 'index']
        );
        Route::post(
            '/company',
            [CompanyController::class, 'store']
        );
        Route::post(
            '/company/edit/{id}',
            [CompanyController::class, 'update']
        );
        Route::post(
            '/company/delete/{id}',
            [CompanyController::class, 'destroy']
        );

        // Permisos
        Route::get(
            '/permissions',
            [PermissionController::class, 'index']
        );


        // Usuarios
        Route::get(
            '/usuarios',
            [UsuariosController::class, 'index']
        );
        Route::post(
            '/usuario',
            [UsuariosController::class, 'store']
        );
        Route::post(
            '/usuario/edit/{id}',
            [UsuariosController::class, 'update']
        );
        Route::post(
            '/usuario/delete/{id}',
            [UsuariosController::class, 'destroy']
        );

        // Perfil
        Route::post(
            '/perfil/{id}',
            [UsuariosController::class, 'perfilUpdate']
        );


        // Route::get(
        //     '/task/{id?}',
        //     'TaskController@index'
        // );
        // Route::get(
        //     '/task/detail/{id}',
        //     [TaskController::class, 'show']
        // );

    });
});
