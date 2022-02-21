<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConvenioController;

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

// Las 2 primeras rutas son públicas, y las 2 siguientes requieren de autenticación.
Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'
], function () {
    Route::post(
        'login',
        'AuthController@login'
    );
    Route::post('signup', 'AuthController@signUp');

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'AuthController@logout');
        Route::get(
            'user',
            'AuthController@user'
        );
        Route::get(
            '/convenios',
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
