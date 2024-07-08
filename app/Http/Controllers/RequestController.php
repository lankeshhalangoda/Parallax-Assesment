<?php

namespace App\Http\Controllers;

use App\Models\Request as RequestModel;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    public function index()
    {
        $requests = RequestModel::all();
        return response()->json(['requests' => $requests], 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'floor' => 'nullable|in:1,2,3',
            'room_unit' => 'nullable|in:Room A,Room B,Unit 1,Unit 2',
            'block' => 'nullable|in:A,B,C,D,E',
            'guest_name' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'location' => 'nullable|string',
            'service' => 'nullable|string',
            'status' => 'nullable|in:NEW,IN_PROGRESS,ON_HOLD,REJECTED,CANCELLED',
            'priority' => 'nullable|in:HIGH,MEDIUM,LOW',
            'department' => 'nullable|string',
            'requested_by' => 'nullable|string',
            'assigned_to' => 'nullable|string',
        ]);

        $newRequest = RequestModel::create($validatedData);
        return response()->json(['request' => $newRequest], 201);
    }

    public function update(Request $request, $id)
    {
        $requestToUpdate = RequestModel::findOrFail($id);
        $validatedData = $request->validate([
            'floor' => 'nullable|in:1,2,3',
            'room_unit' => 'nullable|in:Room A,Room B,Unit 1,Unit 2',
            'block' => 'nullable|in:A,B,C,D,E',
            'guest_name' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'location' => 'nullable|string',
            'service' => 'nullable|string',
            'status' => 'nullable|in:NEW,IN_PROGRESS,ON_HOLD,REJECTED,CANCELLED',
            'priority' => 'nullable|in:HIGH,MEDIUM,LOW',
            'department' => 'nullable|string',
            'requested_by' => 'nullable|string',
            'assigned_to' => 'nullable|string',
        ]);

        $requestToUpdate->update($validatedData);
        return response()->json(['request' => $requestToUpdate], 200);
    }

    public function destroy($id)
    {
        $requestToDelete = RequestModel::findOrFail($id);
        $requestToDelete->delete();
        return response()->json(['message' => 'Request deleted successfully'], 200);
    }
}
