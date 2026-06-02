<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AttendanceController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Employee Management resource routes (CRUD)
    Route::resource('employees', EmployeeController::class);
});

Route::get('/attendance', [AttendanceController::class, 'index'])->name('attendance.index');

Route::get('/attendance/test-connection', function () {
    set_time_limit(15);
    $zk = new \App\Services\ZktecoService();
    // Step 1: raw UDP reachability check (fast, 3s max)
    $reachable = $zk->isReachable();
    if (! $reachable) {
        return response()->json([
            'step'    => 'reachability',
            'status'  => 'FAILED',
            'message' => 'UDP port 4370 is not reachable from this machine.',
            'ip'      => env('ZK_IP'),
            'port'    => env('ZK_PORT'),
            'fix'     => 'Check: 1) Device is powered on, 2) Port 4370 UDP is forwarded on the router, 3) No firewall blocking UDP, 4) Your PC and device are on same network or VPN'
        ]);
    }

    // Step 2: ZKTeco protocol connect
    $connected = $zk->connect();
    if (! $connected) {
        return response()->json([
            'step'    => 'zkteco_connect',
            'status'  => 'FAILED',
            'message' => 'UDP port is open but ZKTeco handshake failed.',
            'ip'      => env('ZK_IP'),
            'fix'     => 'Device may be busy, password protected, or a different model.'
        ]);
    }

    // Step 3: get device info
    $info = $zk->getDeviceInfo();
    $zk->disconnect();

    return response()->json([
        'step'   => 'full_connect',
        'status' => 'SUCCESS',
        'device' => $info,
    ]);
});
require __DIR__.'/settings.php';
