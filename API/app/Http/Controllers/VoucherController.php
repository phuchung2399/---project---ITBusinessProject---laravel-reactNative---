<?php

namespace App\Http\Controllers;

use App\Voucher;
use Ramsey\Uuid\Uuid;
use Illuminate\Http\Response;
use App\Http\Requests\VoucherRequest;

class VoucherController extends Controller
{
    public function getAllVouchers()
    {
        $voucher = Voucher::all();
        return response()->json($voucher, Response::HTTP_OK);
    }

    public function getVoucher($id)
    {
        if (Voucher::where('voucher_id', $id)->exists()) {
            $voucher = Voucher::where('voucher_id', $id)->get();
            return response()->json($voucher, 200);
        } else {
            return response()->json([
                "message" => "voucher not found"
            ], 404);
        }
    }

    public function createVoucher(VoucherRequest $request)
    {
        $voucher = new Voucher;
        $voucher->voucher_id = Uuid::uuid4();
        $voucher->voucher_name = trim(preg_replace('/\s+/', '',  $request->voucher_name));
        $voucher->price = $request->price;
        $voucher->quantity = $request->quantity;
        $voucher->save();
        return response()->json([
            "message" => "Voucher created successfully"
        ], 201);
    }

    public function updateVoucher(VoucherRequest $request, $id)
    {
        if (Voucher::where('voucher_id', $id)->exists()) {
            $voucher = Voucher::find($id);
            $voucher->voucher_name = trim(preg_replace('/\s+/', '',  $request->voucher_name));
            $voucher->price = $request->price;
            $voucher->quantity = $request->quantity;
            $voucher->save();
            return response()->json([
                "message" => "Updated successfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "Voucher not found"
            ], 404);
        }
    }

    public function deleteVoucher($id)
    {
        if (Voucher::where('voucher_id', $id)->exists()) {
            $voucher = Voucher::find($id);
            $voucher->delete();
            return response()->json([
                "message" => "Deleted successfully"
            ], 202);
        } else {
            return response()->json([
                "message" => "Voucher not found"
            ], 404);
        }
    }
}
