<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;

    protected $fillable = [
        'floor', 'room_unit', 'block', 'guest_name', 'phone_number',
        'location', 'service', 'status', 'priority', 'department', 'requested_by', 'assigned_to',
    ];
}
