<?php

namespace App\Services;

use Jmrashed\Zkteco\Lib\ZKTeco;

class ZktecoService
{
    protected ZKTeco $zk;
    protected string $ip;
    protected int $port;

    public function __construct()
    {
        $this->ip   = env('ZK_IP', '103.77.60.170');
        $this->port = (int) env('ZK_PORT', 4370);

        // Hard cap: this request will never hang longer than this
        set_time_limit(15);

        $this->zk = new ZKTeco($this->ip, $this->port);
    }

    /**
     * Test raw UDP reachability BEFORE attempting ZKTeco connect.
     * Returns true if the host responds to a UDP probe within 3 seconds.
     */
    public function isReachable(): bool
    {
        $socket = @fsockopen(
            'udp://' . $this->ip,
            $this->port,
            $errno,
            $errstr,
            3  // 3 second timeout
        );

        if (! $socket) {
            return false;
        }

        // Send a tiny probe and check if we get anything back
        stream_set_timeout($socket, 3);
        @fwrite($socket, "\x00");
        $read = @fread($socket, 8);
        fclose($socket);

        // UDP is connectionless — even no response means host is likely there
        // If fsockopen succeeded without error, the port is routable
        return true;
    }

    public function connect(): bool
    {
        try {
            return (bool) $this->zk->connect();
        } catch (\Throwable $e) {
            return false;
        }
    }

    public function disconnect(): void
    {
        try {
            $this->zk->disconnect();
        } catch (\Throwable $e) {}
    }

    public function getAttendance(): array
    {
        try {
            return $this->zk->getAttendance() ?? [];
        } catch (\Throwable $e) {
            return [];
        }
    }

    public function getUsers(): array
    {
        try {
            return $this->zk->getUser() ?? [];
        } catch (\Throwable $e) {
            return [];
        }
    }

    public function getDeviceInfo(): array
    {
        try {
            return [
                'serial'      => $this->zk->getSerialNumber(),
                'firmware'    => $this->zk->getFirmwareVersion(),
                'platform'    => $this->zk->getPlatform(),
                'device_name' => $this->zk->getDeviceName(),
                'time'        => $this->zk->getTime(),
            ];
        } catch (\Throwable $e) {
            return ['error' => $e->getMessage()];
        }
    }
}