<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Services\ZktecoService;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index()
    {
        $records = Attendance::latest('punched_at')->paginate(50);
        $total   = Attendance::count();
        $today   = Attendance::whereDate('punched_at', today())->count();
        $users   = Attendance::distinct('user_id')->count('user_id');

        return view('attendance.index', compact('records', 'total', 'today', 'users'));
    }

    public function sync()
{
    $zk = new ZktecoService();

    try {
        $connected = $zk->connect();

        if (! $connected) {
            return back()->with('error', '❌ Could not connect to F22 at ' . env('ZK_IP') . '. Check IP, port, and that UDP 4370 is reachable.');
        }

        $attendance = $zk->getAttendance();
        $zk->disconnect();

        if (empty($attendance)) {
            return back()->with('error', '⚠️ Connected but got 0 records. Device may have no data.');
        }

        $imported = 0;
        foreach ($attendance as $record) {
            Attendance::updateOrCreate(
                [
                    'uid'        => $record[0],
                    'punched_at' => $record[3],
                ],
                [
                    'user_id' => $record[1],
                    'state'   => $record[2],
                    'type'    => $record[4],
                ]
            );
            $imported++;
        }

        return back()->with('success', "✅ Synced {$imported} records from F22.");

    } catch (\Throwable $e) {
        $zk->disconnect();
        return back()->with('error', '❌ Error: ' . $e->getMessage());
    }
}}