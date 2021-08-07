<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Throwable
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        // CONDICIONAL PARA CONFIGURAR LAS RESPUESTAS SIN DATOS EN UNA APIREST
        if($exception instanceof ModelNotFoundException)
        {
            return response()->json([
                'response' => false,
                'error' => 'Error 404, los datos no fueron encontrados.'
            ], 400);
        }

        if($exception instanceof RouteNotFoundException)
        {
            return response()->json([
                'response' => false,
                'error'    => 'No tienes permisos para ingresar a este sistema.'
            ],401);
        }

        if($exception instanceof MethodNotAllowedHttpException)
        {
            return response()->json([
                'response' => false,
                'error'    => 'Metodo incorrecto.'
            ],405);
        }

        if($exception instanceof QueryException)
        {
            return response()->json([
                'response' => false,
                'error'    => 'No se pudo agregar.'
            ],405);
        }

        return parent::render($request, $exception);
    }
}
